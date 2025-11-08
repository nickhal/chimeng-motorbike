"use client";

import { useState, useEffect, useRef, TouchEvent, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GallerySliderProps {
  images: GalleryImage[];
  categories: string[];
}

export default function GallerySlider({
  images,
  categories,
}: GallerySliderProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<GalleryImage | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Min swipe distance (in px)
  const minSwipeDistance = 50;

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  // Check if a category has no images
  const categoryHasImages = (category: string) => {
    if (category === "all") return images.length > 0;
    return images.filter((img) => img.category === category).length > 0;
  };

  const handlePrev = useCallback(() => {
    if (filteredImages.length === 0) return;
    setActiveIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    if (filteredImages.length === 0) return;
    setActiveIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const openModal = (image: GalleryImage, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setImageLoading(true);
      setModalImage(image);
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const closeModal = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      setModalOpen(false);
      // Small delay to prevent flickering
      setTimeout(() => {
        document.body.style.overflow = "auto";
        setModalImage(null);
      }, 200);
    } catch (error) {
      console.error("Error closing modal:", error);
      // Fallback in case of error
      document.body.style.overflow = "auto";
      setModalOpen(false);
      setModalImage(null);
    }
  }, []);

  // Touch event handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Check if images are loaded
  useEffect(() => {
    setIsLoading(false);
    if (images && images.length > 0) {
      setActiveIndex(0);
    }
  }, [images]);

  // Verify category has images before setting it
  const handleCategoryChange = (category: string) => {
    if (categoryHasImages(category)) {
      setActiveCategory(category);
      setActiveIndex(0);
    } else {
      console.warn(`Category ${category} has no images`);
      // Fallback to "all" if the category has no images
      setActiveCategory("all");
    }
  };

  // Handle keyboard navigation and click outside to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "Escape") closeModal(e);
        return;
      }

      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen, handleNext, handlePrev, closeModal]);

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!modalOpen && filteredImages.length > 0) handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, modalOpen, filteredImages.length, handleNext]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative">
      {/* Main Slider */}
      <div
        ref={sliderRef}
        className="gallery-slider h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center bg-brand-gray">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : filteredImages && filteredImages.length > 0 ? (
          <>
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`gallery-slide absolute inset-0 ${
                  index === activeIndex ? "active" : ""
                }`}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    priority={index === activeIndex}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-3 md:p-6">
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">
                        {image.alt}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm uppercase tracking-wider">
                        {image.category}
                      </p>
                    </div>
                    <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6">
                      <Button
                        onClick={(e) => openModal(image, e)}
                        className="bg-brand-green hover:bg-brand-green/90 text-white text-xs md:text-sm py-1 px-2 md:py-2 md:px-4"
                      >
                        View Larger
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              className="gallery-arrow prev absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 z-10 flex items-center justify-center touch-manipulation"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </button>
            <button
              className="gallery-arrow next absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 z-10 flex items-center justify-center touch-manipulation"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-gray">
            <p className="text-white">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-2 md:mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 md:gap-2">
        {filteredImages &&
          filteredImages.slice(0, 8).map((image, index) => (
            <div
              key={`thumb-${index}`}
              className={`relative h-16 md:h-24 cursor-pointer overflow-hidden rounded-md transition-all ${
                index === activeIndex
                  ? "ring-2 ring-brand-green"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, 12.5vw"
              />
            </div>
          ))}
      </div>

      {/* Lightbox Modal - Portal implementation */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          aria-label="Image lightbox"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* Close button - keep outside of content div for proper event handling */}
              <button
                className="absolute top-4 right-4 z-[60] bg-black/70 hover:bg-black/90 rounded-full p-2 transition-colors duration-200"
                onClick={(e) => closeModal(e)}
                aria-label="Close modal"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </button>

              {/* Modal content */}
              <div
                ref={modalRef}
                className="relative w-full max-w-5xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {modalImage && (
                  <div className="relative w-full mx-auto">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <div className="relative h-[50vh] sm:h-[70vh] md:h-[80vh]">
                      <Image
                        src={modalImage.src || "/placeholder.svg"}
                        alt={modalImage.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        onLoadingComplete={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                        quality={90}
                        priority
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-white text-base md:text-lg font-medium">
                        {modalImage.alt}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm">
                        {modalImage.category}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
