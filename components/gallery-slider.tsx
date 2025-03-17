"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

interface GallerySliderProps {
  images: GalleryImage[]
  categories: string[]
}

export default function GallerySlider({ images, categories }: GallerySliderProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<GalleryImage | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const filteredImages = activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  const openModal = (image: GalleryImage) => {
    setModalImage(image)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "Escape") closeModal()
        return
      }

      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalOpen])

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!modalOpen) handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, modalOpen, filteredImages.length])

  return (
    <div className="relative">
      {/* Category Tabs */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md bg-brand-gray p-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
              activeCategory === "all" ? "bg-brand-red text-white rounded-md" : "text-gray-300 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                activeCategory === category ? "bg-brand-red text-white rounded-md" : "text-gray-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Slider */}
      <div ref={sliderRef} className="gallery-slider h-[500px] rounded-xl overflow-hidden relative">
        {filteredImages.length > 0 ? (
          <>
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`gallery-slide absolute inset-0 ${index === activeIndex ? "active" : ""}`}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <div className="relative h-full w-full">
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{image.alt}</h3>
                      <p className="text-gray-300 text-sm uppercase tracking-wider">{image.category}</p>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <Button
                        onClick={() => openModal(image)}
                        className="bg-brand-red hover:bg-brand-red/90 text-white"
                      >
                        View Larger
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <div className="gallery-arrow prev" onClick={handlePrev}>
              <ChevronLeft className="h-6 w-6 text-white" />
            </div>
            <div className="gallery-arrow next" onClick={handleNext}>
              <ChevronRight className="h-6 w-6 text-white" />
            </div>

            {/* Dots Navigation */}
            <div className="gallery-navigation">
              {filteredImages.map((_, index) => (
                <div
                  key={index}
                  className={`gallery-dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-gray">
            <p className="text-white">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {filteredImages.slice(0, 5).map((image, index) => (
          <div
            key={`thumb-${index}`}
            className={`relative aspect-square cursor-pointer overflow-hidden rounded-md transition-all ${
              index === activeIndex ? "ring-2 ring-brand-red" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={image.src || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <div className={`gallery-modal ${modalOpen ? "open" : ""}`} onClick={closeModal}>
        <div className="gallery-modal-close" onClick={closeModal}>
          <X className="h-6 w-6 text-white" />
        </div>
        <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
          {modalImage && (
            <div className="relative h-[80vh] w-[80vw]">
              <Image src={modalImage.src || "/placeholder.svg"} alt={modalImage.alt} fill className="object-contain" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

