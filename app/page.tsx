"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Clock,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TestimonialCard from "@/components/testimonial-card";
import PricingCard from "@/components/pricing-card";
import BookingForm from "@/components/booking-form";
import GallerySlider from "@/components/gallery-slider";
import LocationCard from "@/components/location-card";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        heroRef.current.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate parallax transform values
  const calculateTransform = (depth = 30) => {
    const { x, y } = mousePosition;
    const moveX = (x - 0.5) * depth;
    const moveY = (y - 0.5) * depth;
    return `translate3d(${moveX}px, ${moveY}px, 0)`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-lightgray">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-32E15dATSwy8uev3vbkMCRAdfmt4PY.png"
            alt="Uluwatu Tattoos Bali Shop"
            fill
            className="object-cover brightness-[0.3]"
            priority
            style={{ transform: calculateTransform(20) }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 to-brand-black/90"></div>
        </div>

        <div
          className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
          style={{ transform: calculateTransform(10) }}
        >
          <div className="mb-8 w-48 md:w-64 animate-float">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20TATO%20NEW%20BLANK-WbMeQlhj3bwu1bFLoTX6Yuk1doGjT7.png"
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
            Experience authentic Balinese tattoo artistry in a modern studio
            setting
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 pulse-glow"
            >
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-brand-black hover:bg-white/10 hover:text-white uppercase tracking-wider font-medium"
            >
              View Gallery
            </Button>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
          style={{ transform: calculateTransform(5) }}
        >
          <div className="flex space-x-4">
            <Link
              href="#"
              className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-brand-red hover:scale-110"
            >
              <Instagram className="h-6 w-6 text-white" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-brand-red hover:scale-110"
            >
              <Facebook className="h-6 w-6 text-white" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-brand-red hover:scale-110"
            >
              <Mail className="h-6 w-6 text-white" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center">
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

      {/* Locations Section (Replacing Artists Section) */}
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
              image="/placeholder.svg?height=500&width=800"
              address="Jl. Labuansait No.81, Pecatu, Uluwatu, Kabupaten Badung, Bali 80361"
              hours="9am - 8pm everyday"
              phone="+62 812-3456-7890"
              isNew={true}
              mapUrl="https://maps.google.com/?q=Padang+Padang+Beach+Bali"
              description="Our newest studio located near the famous Padang Padang Beach. Featuring ocean views, expanded facilities, and the same exceptional artistry in a breathtaking setting."
            />

            <LocationCard
              name="Ungasan"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-32E15dATSwy8uev3vbkMCRAdfmt4PY.png"
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
              <Badge className="mb-4 w-fit bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
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
              <Button
                variant="outline"
                className="w-fit border-brand-red text-brand-red hover:bg-brand-red hover:text-white uppercase tracking-wider font-medium group transition-all"
              >
                Learn More About Our Studio
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl md:h-[500px] group">
              <Image
                src="/placeholder.svg?height=500&width=500"
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
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SlBg8uK0cj0d7FIKi3cFbRskDLkvsj.png"
              description="A design style that uses fine lines to create small, delicate, and detailed tattoos"
            />

            <PricingCard
              title="Single Piece"
              price="4,000k IDR+"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SlBg8uK0cj0d7FIKi3cFbRskDLkvsj.png"
              description="This piece is a beautiful and intricate design on any place of your choosing"
            />

            <PricingCard
              title="Sleeve Piece"
              price="9,000k IDR+"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SlBg8uK0cj0d7FIKi3cFbRskDLkvsj.png"
              description="Available in a quarter, half, or full sleeve, this type of tattoo may require some consulting and multiple session to complete"
            />

            <PricingCard
              title="Full Back"
              price="18,000k IDR+"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SlBg8uK0cj0d7FIKi3cFbRskDLkvsj.png"
              description="This will require multiple session and some collaborative work with Andre to help bring your visions to live"
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-brand-black py-20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-lightgray to-transparent"></div>
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider">
              OUR WORK
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-white uppercase tracking-tight md:text-4xl lg:text-5xl">
              Gallery of Our Finest Work
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Browse through our portfolio of tattoos to find inspiration for
              your next piece.
            </p>
          </div>

          <GallerySlider
            images={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hyBKiBUO6NA835sBxGswHfEzwjgK5b.png",
                alt: "Traditional Balinese Tattoo",
                category: "balinese",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SlBg8uK0cj0d7FIKi3cFbRskDLkvsj.png",
                alt: "Modern Geometric Design",
                category: "modern",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-32E15dATSwy8uev3vbkMCRAdfmt4PY.png",
                alt: "Custom Sleeve Artwork",
                category: "custom",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8VhTXnaLcGM4Ol6DNxcxQ4x4aVPPU4.png",
                alt: "Fine Line Portrait",
                category: "modern",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hyBKiBUO6NA835sBxGswHfEzwjgK5b.png",
                alt: "Traditional Mask Design",
                category: "balinese",
              },
              {
                src: "/placeholder.svg?height=600&width=800",
                alt: "Blackwork Pattern",
                category: "modern",
              },
              {
                src: "/placeholder.svg?height=600&width=800",
                alt: "Custom Back Piece",
                category: "custom",
              },
              {
                src: "/placeholder.svg?height=600&width=800",
                alt: "Balinese Script",
                category: "balinese",
              },
              {
                src: "/placeholder.svg?height=600&width=800",
                alt: "Minimalist Design",
                category: "modern",
              },
              {
                src: "/placeholder.svg?height=600&width=800",
                alt: "Custom Spiritual Symbol",
                category: "custom",
              },
            ]}
            categories={["balinese", "modern", "custom"]}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-lightgray to-transparent"></div>
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
              name="Sarah J."
              rating={5}
              review="Absolutely amazing experience! Andre is not only incredibly talented but also made me feel comfortable throughout the entire process. My tattoo is beautiful and exactly what I wanted."
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Michael T."
              rating={5}
              review="The level of detail in my Balinese-inspired sleeve is incredible. Worth every penny and the multiple sessions. The studio is clean, professional, and everyone is so friendly."
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Anugrah Diatmika"
              rating={5}
              review="Good service and high quality tattoos. The artists really take the time to understand what you want and make helpful suggestions to improve the design."
              image="/placeholder.svg?height=100&width=100"
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white uppercase tracking-wider font-medium group transition-all"
            >
              Read More Reviews
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Section with Both Locations */}
      <section
        id="booking"
        className="py-20 relative overflow-hidden"
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
              Book your consultation or appointment today at either of our
              locations. Our team is ready to help bring your tattoo vision to
              life.
            </p>
          </div>

          <Tabs
            defaultValue="padang-padang"
            className="w-full"
          >
            <TabsList className="mx-auto mb-8 grid w-fit grid-cols-2 bg-brand-gray">
              <TabsTrigger
                value="padang-padang"
                className="uppercase tracking-wider data-[state=active]:bg-brand-red px-8"
              >
                Padang Padang
                <Badge className="ml-2 bg-brand-red/30 text-white text-xs">
                  NEW
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="ungasan"
                className="uppercase tracking-wider data-[state=active]:bg-brand-red px-8"
              >
                Ungasan
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="padang-padang"
              className="mt-0"
            >
              <div className="grid gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h3 className="mb-4 font-sans text-2xl font-bold text-brand-black uppercase">
                    Padang Padang Location
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-gray-600">
                    Our newest studio located near the famous Padang Padang
                    Beach. Featuring ocean views, expanded facilities, and the
                    same exceptional artistry in a breathtaking setting.
                  </p>

                  <div className="mb-6 grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">
                          Address
                        </h3>
                        <p className="text-gray-600">
                          Jl. Labuansait No.81, Pecatu, Uluwatu, Kabupaten
                          Badung, Bali 80361
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">Hours</h3>
                        <p className="text-gray-600">9am - 8pm everyday</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">
                          Contact
                        </h3>
                        <p className="text-gray-600">
                          +62 812-3456-7890 | padang@uluwatutattoos.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px] overflow-hidden rounded-xl shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.9651666308813!2d115.10999!3d-8.81667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b9f8a7de937%3A0x8f5e6d2c2b9bbd4d!2sPadang%20Padang%20Beach!5e0!3m2!1sen!2sid!4v1616000000000!5m2!1sen!2sid"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Uluwatu Tattoos Padang Padang Location"
                    ></iframe>
                  </div>
                </div>

                <div>
                  <Card className="border-none shadow-xl overflow-hidden">
                    <div className="bg-brand-black text-white p-6 uppercase tracking-wider font-bold text-center text-xl">
                      Book at Padang Padang
                      <Badge className="ml-2 bg-brand-red text-white">
                        NEW
                      </Badge>
                    </div>
                    <CardContent className="p-6 pt-8">
                      <BookingForm />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="ungasan"
              className="mt-0"
            >
              <div className="grid gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h3 className="mb-4 font-sans text-2xl font-bold text-brand-black uppercase">
                    Ungasan Location
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-gray-600">
                    Our original studio in Ungasan offers a relaxed atmosphere
                    with traditional Balinese elements. A peaceful setting for
                    your tattoo experience with our skilled artists.
                  </p>

                  <div className="mb-6 grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">
                          Address
                        </h3>
                        <p className="text-gray-600">
                          Jl. Pura Masuka No.41, Ungasan, Kec. Kuta Sel.,
                          Kabupaten Badung, Bali 80361
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">Hours</h3>
                        <p className="text-gray-600">9am - 8pm everyday</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black">
                          Contact
                        </h3>
                        <p className="text-gray-600">
                          +62 812-3456-7890 | info@uluwatutattoos.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px] overflow-hidden rounded-xl shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.5698153225774!2d115.16699999999999!3d-8.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDgnMDAuMCJTIDExNcKwMTAnMDEuMiJF!5e0!3m2!1sen!2sid!4v1616000000000!5m2!1sen!2sid"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Uluwatu Tattoos Ungasan Location"
                    ></iframe>
                  </div>
                </div>

                <div>
                  <Card className="border-none shadow-xl overflow-hidden">
                    <div className="bg-brand-black text-white p-6 uppercase tracking-wider font-bold text-center text-xl">
                      Book at Ungasan
                    </div>
                    <CardContent className="p-6 pt-8">
                      <BookingForm />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
