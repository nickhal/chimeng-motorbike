"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronDown, Users, Paintbrush } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TestimonialCard from "@/components/testimonial-card";
import PricingCard from "@/components/pricing-card";
import GallerySlider from "@/components/gallery-slider";
import LocationCard from "@/components/location-card";

// Define interface for gallery images
interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 }); // Add ref to track current position
  const [shuffledImages, setShuffledImages] = useState<GalleryImage[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: GalleryImage[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Parallax effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        heroRef.current.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      mousePositionRef.current = { x, y }; // Update ref
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      if (!heroRef.current) return;

      // Check if hero section is in viewport
      const rect = heroRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInViewport) return;

      // When scrolling without mouse movement, ensure we still have a good parallax position
      // Use the ref for current position or default to center position
      const { x } = mousePositionRef.current;

      // Force re-render with slightly adjusted values to create subtle movement during scroll
      const scrollY = window.scrollY;
      // Slightly adjust y position based on scroll to create a subtle movement effect
      const adjustedY = 0.5 + (scrollY % 100) / 1000;

      setMousePosition({ x, y: adjustedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Initialize position to center for better default appearance
    mousePositionRef.current = { x: 0.5, y: 0.5 };
    setMousePosition({ x: 0.5, y: 0.5 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize shuffled images on client side
  useEffect(() => {
    const galleryImages = [
      {
        src: "/images/bali-demon-calf.jpg",
        alt: "Bali Demon Calf Tattoo",
        category: "balinese",
      },
      {
        src: "/images/bali-demon-forearm.jpg",
        alt: "Bali Demon Forearm Tattoo",
        category: "balinese",
      },
      {
        src: "/images/bali-demon-shoulder.jpg",
        alt: "Bali Demon Shoulder Tattoo",
        category: "balinese",
      },
      {
        src: "/images/bali-pattern-forearm.jpg",
        alt: "Bali Pattern Forearm Tattoo",
        category: "balinese",
      },
      {
        src: "/images/bali-shoulder.jpg",
        alt: "Bali Shoulder Design",
        category: "balinese",
      },
      {
        src: "/images/ganesha-arm.jpg",
        alt: "Ganesha Arm Tattoo",
        category: "balinese",
      },
      {
        src: "/images/back-fineline.jpg",
        alt: "Back Fineline Tattoo",
        category: "fineline",
      },
      {
        src: "/images/butterfly-hand.jpg",
        alt: "Butterfly Hand Tattoo",
        category: "fineline",
      },
      {
        src: "/images/butterfly-stomach.jpg",
        alt: "Butterfly Stomach Tattoo",
        category: "fineline",
      },
      {
        src: "/images/fineline-arm.jpg",
        alt: "Fineline Arm Design",
        category: "fineline",
      },
      {
        src: "/images/fineline-chest.jpg",
        alt: "Fineline Chest Tattoo",
        category: "fineline",
      },
      {
        src: "/images/heart-fineline.jpg",
        alt: "Heart Fineline Tattoo",
        category: "fineline",
      },
      {
        src: "/images/rose-fineline.jpg",
        alt: "Rose Fineline Tattoo",
        category: "fineline",
      },
      {
        src: "/images/buddha-calf.jpg",
        alt: "Buddha Calf Tattoo",
        category: "modern",
      },
      {
        src: "/images/demon-forearm.jpg",
        alt: "Demon Forearm Tattoo",
        category: "modern",
      },
      {
        src: "/images/egyptian-calf.jpg",
        alt: "Egyptian Calf Tattoo",
        category: "modern",
      },
      {
        src: "/images/eskimo-leg.jpg",
        alt: "Eskimo Leg Tattoo",
        category: "modern",
      },
      {
        src: "/images/face-calf.jpg",
        alt: "Face Calf Tattoo",
        category: "modern",
      },
      {
        src: "/images/flower-chest.jpg",
        alt: "Flower Chest Tattoo",
        category: "modern",
      },
      {
        src: "/images/flower-design-quad.jpg",
        alt: "Flower Design Quadrant",
        category: "modern",
      },
      {
        src: "/images/flower-sleeve.jpg",
        alt: "Flower Sleeve Tattoo",
        category: "modern",
      },
      {
        src: "/images/full-sleeve.jpg",
        alt: "Full Sleeve Tattoo Design",
        category: "modern",
      },
      {
        src: "/images/indian-calf.jpg",
        alt: "Indian Calf Tattoo",
        category: "modern",
      },
      {
        src: "/images/japanese-woman.jpg",
        alt: "Japanese Woman Tattoo",
        category: "modern",
      },
      {
        src: "/images/lion-leg.jpg",
        alt: "Lion Leg Tattoo",
        category: "modern",
      },
      {
        src: "/images/medusa.jpg",
        alt: "Medusa Tattoo Design",
        category: "modern",
      },
      {
        src: "/images/wolf-shoulder.jpg",
        alt: "Wolf Shoulder Tattoo",
        category: "modern",
      },
    ];

    setShuffledImages(shuffleArray(galleryImages));
  }, []);

  // Calculate parallax transform values with scale
  const calculateTransform = (depth = 30, scale = 1) => {
    const { x, y } = mousePosition;
    const moveX = (x - 0.5) * depth;
    const moveY = (y - 0.5) * depth;
    return `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-lightgray">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-[#1A1A1A] pt-20 md:pt-0"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ungasan-location.jpg"
            alt="Uluwatu Tattoos Bali Shop"
            fill
            className="object-cover brightness-[0.2] origin-center"
            priority
            style={{ transform: calculateTransform(20, 1.1) }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 to-brand-black/90"></div>
        </div>

        <div
          className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
          style={{ transform: calculateTransform(10, 1.05) }}
        >
          <div className="mb-8 w-48 md:w-64 animate-float">
            <Image
              src="/images/logo.png"
              alt="Uluwatu Tattoos Logo"
              width={300}
              height={300}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="mb-4 font-sans text-5xl font-bold tracking-tight uppercase md:text-6xl lg:text-7xl">
            <span className="block">ULUWATU</span>
            <span className="block mt-2 text-brand-red">TATTOOS BALI</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl text-gray-300">
            Experience authentic Balinese tattoo artistry with a modern touch
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 pulse-glow"
            >
              <Link href="https://wa.me/6281338702013">Book Appointment</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-brand-black hover:bg-white/10 hover:text-white uppercase tracking-wider font-medium"
            >
              <Link href="#gallery">View Gallery</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-10 hidden sm:flex justify-center">
          <Link
            href="#about"
            className="flex flex-col items-center text-white animate-pulse"
          >
            <span className="mb-2 text-sm uppercase tracking-widest">
              Scroll Down
            </span>
            <ChevronDown className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Locations Section */}
      <section
        id="locations"
        className="py-20 relative overflow-hidden ink-splatter"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              OUR LOCATIONS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Visit Our Studios
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Experience the art of tattooing at either of our premium locations
              in Bali, each offering a unique atmosphere and the same
              exceptional quality.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <LocationCard
              name="Padang Padang"
              image="/images/padang-padang-location-1.jpg"
              address="Jl. Labuansait No.81, Pecatu, Uluwatu, Kabupaten Badung, Bali 80361"
              hours="9am - 8pm everyday"
              phone="+62 812-3456-7890"
              isNew={true}
              mapUrl="https://maps.google.com/?q=Padang+Padang+Beach+Bali"
              description="Our newest studio located near the famous Padang Padang Beach. Featuring ocean views, expanded facilities, and the same exceptional artistry in a breathtaking setting."
            />

            <LocationCard
              name="Ungasan"
              image="/images/ungasan-location.jpg"
              address="Jl. Pura Masuka No.41, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361"
              hours="9am - 8pm everyday"
              phone="+62 812-3456-7890"
              mapUrl="https://maps.google.com/?q=Uluwatu+Tattoos+Bali"
              description="Our original studio in Ungasan offers a relaxed atmosphere with traditional Balinese elements. A peaceful setting for your tattoo experience with our skilled artists."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-brand-black py-20 text-white relative overflow-hidden balinese-pattern"
      >
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
                AUTHENTIC ARTISTRY
              </Badge>
              <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
                Where Tradition Meets{" "}
                <span className="text-brand-red">Modern Technique</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                At Uluwatu Tattoos, we blend traditional Balinese artistic
                elements with contemporary tattoo techniques to create unique,
                personalized body art that tells your story.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                Our studio in Bali offers a clean, professional environment
                where skilled artists work with you to bring your vision to
                life, whether you&apos;re looking for a small memento of your
                travels or an elaborate full-body piece.
              </p>
              {/* <Button
                variant="outline"
                className="w-fit border-brand-red text-brand-red hover:bg-brand-red hover:text-white uppercase tracking-wider font-medium group transition-all"
              >
                Learn More About Our Studio
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button> */}
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl md:h-[500px] group">
              <Image
                src="/images/outside-studio.jpg"
                alt="Tattoo Studio Interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Our Studio
                  </h3>
                  <p className="text-gray-300">
                    Modern facilities with traditional Balinese influences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              OUR RATES
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Tattoo Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Compare tattoo options to see which is the best fit for you. All
              prices are starting points and may vary based on complexity and
              size.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <PricingCard
              title="Fineline Tattoos"
              price="500k IDR+"
              image="/images/fineline-arm.jpg"
              description="A design style that uses fine lines to create small, delicate, and detailed tattoos"
            />

            <PricingCard
              title="Single Piece"
              price="4,000k IDR+"
              image="/images/bali-demon-shoulder.jpg"
              description="This piece is a beautiful and intricate design on any place of your choosing"
            />

            <PricingCard
              title="Sleeve Piece"
              price="9,000k IDR+"
              image="/images/full-sleeve.jpg"
              description="Available in a quarter, half, or full sleeve, this type of tattoo may require some consulting and multiple session to complete"
            />

            <PricingCard
              title="Full Back"
              price="18,000k IDR+"
              image="/images/full-back.webp"
              description="This will require multiple session and some collaborative work with Andre to help bring your visions to live"
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105">
              <Link href="https://wa.me/6281338702013">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-brand-black py-20 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              OUR WORK
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-white uppercase tracking-tight md:text-4xl lg:text-5xl">
              Studio Gallery
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Browse through our portfolio of tattoos to find inspiration for
              your next piece.
            </p>
          </div>

          <GallerySlider
            images={shuffledImages}
            categories={["balinese", "modern", "fineline"]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="bg-brand-lightgray py-20 relative overflow-hidden balinese-pattern"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              QUESTIONS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to know before getting your tattoo at Uluwatu
              Tattoos Bali.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem
                value="item-1"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  How should I prepare for my appointment?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We recommend getting a good night&apos;s sleep, eating a meal
                  before your appointment, and staying hydrated. Wear
                  comfortable clothing that allows easy access to the area being
                  tattooed. Avoid alcohol for 24 hours before your session, and
                  limit caffeine on the day of your appointment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  What if I have a sunburn? Can I still get a tattoo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We cannot tattoo over sunburned skin as it&apos;s already
                  damaged and will not take ink properly. Additionally, it would
                  be extremely painful and could lead to complications. If you
                  have a sunburn in the area you want tattooed, we&apos;ll need
                  to reschedule your appointment until your skin has fully
                  healed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  Do you accept walk-ins or do you only take appointments?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We accept both walk-ins and appointments, but we strongly
                  recommend booking in advance to ensure artist availability.
                  Walk-ins are accommodated based on our daily schedule, and
                  priority is given to clients with appointments. For complex or
                  large pieces, a consultation appointment is required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  Can I show up drunk to my tattoo appointment?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  No, we will not tattoo anyone who is under the influence of
                  alcohol or drugs. Alcohol thins your blood, which can cause
                  excessive bleeding during the tattoo process and affect the
                  quality of the final result. It also impairs your judgment and
                  may increase sensitivity to pain. If you arrive intoxicated,
                  we will reschedule your appointment and a rebooking fee may
                  apply.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  How can I take care of the tattoo after the appointment?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  After your session, we&apos;ll provide detailed aftercare
                  instructions. Generally, you&apos;ll need to keep the tattoo
                  clean, apply the recommended ointment, avoid direct sunlight,
                  swimming, and soaking in water for at least 2 weeks.
                  Don&apos;t pick at scabs, and wear loose clothing over the
                  tattooed area. Proper aftercare is essential for vibrant,
                  well-healed tattoos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-red">
                  How soon until I can get back into the water?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You should avoid submerging your new tattoo in water (ocean,
                  pools, baths, hot tubs) for at least 2-3 weeks. Brief showers
                  are fine after the first 24-48 hours, but don&apos;t let water
                  directly hit the tattoo for extended periods. Swimming,
                  especially in the ocean or pools with chemicals, can lead to
                  infections and affect the healing process and color retention
                  of your tattoo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-brand-black py-20 text-white relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              TESTIMONIALS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Read reviews from our satisfied customers who have experienced the
              Uluwatu Tattoos difference.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Heather R."
              rating={5}
              review="I walked in right when the shop opened and got two beautiful fine-line tattoos by Zey. An amazing experience and recommend if you're looking for a last-minute fine-lined tattoo!"
              reviewLink="https://g.co/kgs/jF7r3BH"
            />

            <TestimonialCard
              name="Syndee S."
              rating={5}
              review="Went for a walk in and they were able to take me right away. Very clean and professional establishment with great pricing. Would've gotten more if I had the time. Thank you!!"
              reviewLink="https://g.co/kgs/o5JRr2d"
            />

            <TestimonialCard
              name="Aga S."
              rating={5}
              review="The whole process was so smooth, and I couldn't be happier with how it turned out. Truly exceeded my expectations! Highly recommend to anyone looking for a great tattoo studio 🫶🏻"
              reviewLink="https://g.co/kgs/qwZK7UL"
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105">
              <Link href="https://g.co/kgs/1KZWoAN">Read Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Section with Both Locations Side by Side */}
      <section
        id="booking"
        className="py-20 relative overflow-hidden bg-gradient-to-b from-brand-lightgray to-white"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              BOOK NOW
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Ready for Your Next Tattoo?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Your tattoo journey begins with a simple booking. Our artists are
              ready to bring your vision to life with skill and dedication.
            </p>
          </div>

          {/* Booking Process */}
          <div className="mb-16">
            <h3 className="text-center mb-10 font-sans text-2xl font-bold text-brand-black">
              Our Simple Booking Process
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Link href="https://wa.me/6281338702013">
                    <Phone className="h-12 w-12 text-brand-red hover:text-brand-red/80 transition-colors" />
                  </Link>
                </div>
                <h4 className="font-bold text-lg mb-2">Contact Us</h4>
                <p className="text-gray-600">
                  Reach out via WhatsApp or call us to discuss your tattoo idea
                  and schedule a consultation.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Users className="h-12 w-12 text-brand-red" />
                </div>
                <h4 className="font-bold text-lg mb-2">Free Consultation</h4>
                <p className="text-gray-600">
                  Meet with our artists to refine your design, discuss
                  placement, and prepare for your session.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Paintbrush className="h-12 w-12 text-brand-red" />
                </div>
                <h4 className="font-bold text-lg mb-2">Tattoo Session</h4>
                <p className="text-gray-600">
                  Sit back and relax as our skilled artists create your custom
                  tattoo in a clean, professional environment.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* What to Bring */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="mb-6 font-sans text-2xl font-bold text-brand-black uppercase">
                What to Bring to Your Session
              </h3>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-brand-red">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Valid ID (passport or driver&apos;s license)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-brand-red">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Reference images or inspiration for your design
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-brand-red">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Comfortable clothes that allow access to the tattoo area
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-brand-red">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Water and snacks for longer sessions
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-brand-red">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Payment method (cash, card, or digital payment)
                  </span>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-brand-red/10 rounded-lg">
                <p className="text-gray-700 italic">
                  &ldquo;Our artists can help adapt any reference material to
                  create a unique design that&apos;s perfect for you. Don&apos;t
                  worry if you&apos;re not 100% sure about your design -
                  that&apos;s what consultations are for!&rdquo;
                </p>
              </div>
            </div>

            {/* Book Now */}
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col">
              <h3 className="mb-6 font-sans text-2xl font-bold text-brand-black uppercase">
                Book Your Session Today
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-brand-black">
                    WhatsApp or Call
                  </h3>
                  <p className="text-gray-600">+62 813-3870-2013</p>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2 mb-8">
                <div className="text-center p-3 border border-gray-200 rounded-lg">
                  <p className="text-3xl font-bold text-brand-red">2000+</p>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded-lg">
                  <p className="text-3xl font-bold text-brand-red">5.0</p>
                  <p className="text-sm text-gray-600">Google Rating</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="font-medium text-brand-black">
                    Choose Your Studio Location:
                  </h4>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="padang"
                      name="location"
                      className="accent-brand-red"
                      defaultChecked
                    />
                    <label
                      htmlFor="padang"
                      className="text-gray-700"
                    >
                      Padang Padang (New)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="ungasan"
                      name="location"
                      className="accent-brand-red"
                    />
                    <label
                      htmlFor="ungasan"
                      className="text-gray-700"
                    >
                      Ungasan
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2 pulse-glow"
                  size="lg"
                >
                  <Phone className="h-5 w-5" />
                  <Link href="https://wa.me/6281338702013">
                    Book via WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
