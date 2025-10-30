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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: GalleryImage[]) => {
    if (!array || array.length === 0) return [];
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Balance shuffle - ensures all categories have representation
  const balancedShuffle = (images: GalleryImage[], categories: string[]) => {
    if (!images || images.length === 0) return [];

    // Group images by category
    const imagesByCategory: Record<string, GalleryImage[]> = {};

    // Initialize empty arrays for each category
    categories.forEach((category) => {
      imagesByCategory[category] = [];
    });

    // Group images by their category
    images.forEach((image) => {
      if (imagesByCategory[image.category]) {
        imagesByCategory[image.category].push(image);
      }
    });

    // Shuffle each category separately
    categories.forEach((category) => {
      imagesByCategory[category] = shuffleArray(imagesByCategory[category]);
    });

    // Combine the results in a balanced way
    const result: GalleryImage[] = [];

    // Find the category with max items to determine how many rounds we need
    const maxItems = Math.max(
      ...categories.map((cat) => imagesByCategory[cat].length)
    );

    // Take one from each category in turns until all are used
    for (let i = 0; i < maxItems; i++) {
      for (const category of categories) {
        if (i < imagesByCategory[category].length) {
          result.push(imagesByCategory[category][i]);
        }
      }
    }

    return result;
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
    try {
      const galleryImages = [
        {
          src: "/images/2-nmax-h.png",
          alt: "Yamaha NMax scooters",
          category: "nmax",
        },
        {
          src: "/images/n-max-white-v.png",
          alt: "White NMax scooter",
          category: "nmax",
        },
        {
          src: "/images/nmax-white-w-bali-decor-v.png",
          alt: "NMax with Bali decoration",
          category: "nmax",
        },
        {
          src: "/images/black-nmax-vario-v.png",
          alt: "Black NMax and Vario",
          category: "nmax",
        },
        {
          src: "/images/2-vario-v.png",
          alt: "Honda Vario scooters",
          category: "vario",
        },
        {
          src: "/images/2-new-vario-v.png",
          alt: "New Honda Vario models",
          category: "vario",
        },
        {
          src: "/images/2-vario-at-night-v.png",
          alt: "Vario at night",
          category: "vario",
        },
        {
          src: "/images/red-black-scoopy-h.png",
          alt: "Red and black Honda Scoopy",
          category: "scoopy",
        },
        {
          src: "/images/row-of-bike-in-garage-h.png",
          alt: "Our fleet in the garage",
          category: "all",
        },
        {
          src: "/images/chimeng-showing-client-bike-v.png",
          alt: "Chimeng showing bike to client",
          category: "all",
        },
        {
          src: "/images/chimeng-with-client-shaka-v.png",
          alt: "Happy client with rental",
          category: "all",
        },
      ];

      // Use balanced shuffle instead of regular shuffle
      const categories = ["nmax", "vario", "scoopy", "all"];
      const balancedImages = balancedShuffle(galleryImages, categories);
      setShuffledImages(balancedImages);
      setImagesLoaded(true);
    } catch (error) {
      console.error("Error initializing gallery images:", error);
      // Set fallback empty array to prevent errors
      setShuffledImages([]);
      setImagesLoaded(true);
    }
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
            src="/images/row-of-bike-in-garage-h.png"
            alt="Chimeng Motorbike Rental Fleet"
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
              alt="Chimeng Motorbike Rental Logo"
              width={300}
              height={300}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="mb-4 font-sans text-5xl font-bold tracking-tight uppercase md:text-6xl lg:text-7xl">
            <span className="block">CHIMENG</span>
            <span className="block mt-2 text-brand-green">MOTORBIKE RENTAL</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl text-gray-700">
            Quality scooter rentals in Ungasan, Bali - Ride with confidence
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 pulse-glow"
            >
              <Link href="https://wa.me/6282247986694">Rent Now</Link>
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
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              RENTAL OPTIONS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Pick-up or Delivery
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Visit our shop in Ungasan to pick up your bike, or we can deliver it to you anywhere in the area.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <LocationCard
              name="Shop Pick-up"
              image="/images/chimeng-showing-client-bike-v.png"
              address="Jalan Pura Masuka 33, Ungasan, Bali"
              hours="8am - 6pm everyday"
              phone="+62 822-4798-6694"
              mapUrl="https://maps.google.com/?q=Jalan+Pura+Masuka+33,+Ungasan,+Bali"
              description="Visit our shop in Ungasan to browse our fleet and pick up your bike directly. We'll get you on the road quickly with all the necessary equipment."
            />

            <LocationCard
              name="Free Delivery"
              image="/images/chimeng-with-client-shaka-v.png"
              address="We deliver anywhere in the Uluwatu area"
              hours="8am - 6pm everyday"
              phone="+62 822-4798-6694"
              isNew={true}
              mapUrl="https://wa.me/6282247986694"
              description="Can't make it to the shop? No problem! We offer free delivery service to your hotel, villa, or accommodation in the Ungasan and Uluwatu area."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-white py-20 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
                QUALITY RENTALS
              </Badge>
              <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
                Explore Bali{" "}
                <span className="text-brand-green">Your Way</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                At Chimeng Motorbike Rental, we provide quality scooters to help you explore the beautiful island of Bali with ease and freedom. Whether you&apos;re a local or a visitor, we have the perfect ride for you.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                Located in Ungasan, we offer well-maintained Yamaha NMax, Honda Vario, Honda Scoopy, and Yamaha Gear scooters with flexible rental periods - daily, weekly, or monthly. Free delivery available to your hotel or villa in the Uluwatu area.
              </p>
              {/* <Button
                variant="outline"
                className="w-fit border-brand-green text-brand-green hover:bg-brand-green hover:text-white uppercase tracking-wider font-medium group transition-all"
              >
                Learn More About Our Studio
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button> */}
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl md:h-[500px] group">
              <Image
                src="/images/black-nmax-vario-v.png"
                alt="Chimeng's Fleet of Bikes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Our Fleet
                  </h3>
                  <p className="text-gray-700">
                    Quality scooters maintained for your safety and comfort
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
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              OUR RATES
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl" id="fleet">
              Rental Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Choose from our fleet of well-maintained scooters. All bikes include helmets and basic insurance. Daily, weekly, and monthly rates available.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <PricingCard
              title="Honda Scoopy"
              price="100k IDR/day"
              image="/images/red-black-scoopy-h.png"
              description="Perfect for city riding and short trips. Fuel-efficient and easy to handle. Weekly: 600k | Monthly: 1.8M"
            />

            <PricingCard
              title="Yamaha Gear"
              price="100k IDR/day"
              image="/images/red-black-scoopy-h.png"
              description="Compact and agile scooter ideal for navigating Bali's streets. Weekly: 600k | Monthly: 1.8M"
            />

            <PricingCard
              title="Honda Vario"
              price="100k IDR/day"
              image="/images/2-vario-v.png"
              description="Popular and reliable automatic scooter. Great for daily commuting and exploring Bali. Weekly: 650k | Monthly: 2M"
            />

            <PricingCard
              title="Yamaha NMax"
              price="150k IDR/day"
              image="/images/2-nmax-h.png"
              description="Premium automatic scooter with extra power and comfort for longer rides. Weekly: 950k | Monthly: 3M"
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105">
              <Link href="https://wa.me/6282247986694">Rent Now on WhatsApp</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-gray-50 py-20 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              OUR FLEET
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Bike Gallery
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Browse through our collection of quality scooters available for rent. All bikes are well-maintained and ready to ride.
            </p>
          </div>

          {imagesLoaded ? (
            <GallerySlider
              images={shuffledImages}
              categories={["nmax", "vario", "scoopy", "all"]}
            />
          ) : (
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden relative flex items-center justify-center bg-brand-gray">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="bg-brand-lightgray py-20 relative overflow-hidden balinese-pattern"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              QUESTIONS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to know before renting a motorbike from Chimeng Motorbike Rental.
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
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  What do I need to rent a motorbike?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You&apos;ll need a valid driver&apos;s license (international driving permit recommended for foreigners), passport or ID, and a deposit. We provide helmets with every rental. It&apos;s recommended to have experience riding scooters before renting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  Do you offer delivery service?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! We offer free delivery service to hotels and villas in the Ungasan and Uluwatu area. Just contact us on WhatsApp with your location, and we&apos;ll bring the bike to you and pick it up when you&apos;re done.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  What&apos;s included in the rental?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Every rental includes a helmet (or two for couples), basic insurance, and a full tank of gas to start. The bikes are well-maintained and checked before each rental to ensure your safety and comfort.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  How do I book a motorbike?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Booking is easy! Just contact us on WhatsApp at +62 822-4798-6694. Let us know which bike you want, rental duration, and when you need it. We&apos;ll confirm availability and arrange pickup or delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  What are the rental rates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our rates vary by bike model. Yamaha NMax: 150k/day, 950k/week, 3M/month. Honda Vario: 100k/day, 650k/week, 2M/month. Honda Scoopy & Yamaha Gear: 100k/day, 600k/week, 1.8M/month. Contact us for availability. Long-term rentals get the best rates!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border-b border-brand-black/10"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-green">
                  What if something goes wrong with the bike?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We inspect all bikes before rental, but if you experience any issues, contact us immediately on WhatsApp. We&apos;ll assist you quickly. Minor damages are covered by our basic insurance, but major damages or theft will require the deposit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-white py-20 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              TESTIMONIALS
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Read reviews from our satisfied customers who have rented bikes from Chimeng Motorbike Rental.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Sarah M."
              rating={5}
              review="Great service! Chimeng delivered the NMax to our villa and picked it up when we were done. The bike was clean and ran perfectly. Highly recommend for exploring Uluwatu!"
              reviewLink="https://g.co/kgs/chimeng1"
            />

            <TestimonialCard
              name="Tom K."
              rating={5}
              review="Best rental experience in Bali. Fair prices, well-maintained bikes, and super friendly service. Rented a Vario for a week and had no issues at all. Will rent again!"
              reviewLink="https://g.co/kgs/chimeng2"
            />

            <TestimonialCard
              name="Lisa & Mike"
              rating={5}
              review="Chimeng was so helpful and patient with us. Got a Scoopy for a month at a great rate. Free delivery was a bonus! Perfect way to explore Bali at our own pace."
              reviewLink="https://g.co/kgs/chimeng3"
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105">
              <Link href="https://g.page/r/chimengmotorbikerental">Read More Reviews</Link>
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
            <Badge className="mb-4 bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider">
              RENT NOW
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold text-brand-black uppercase tracking-tight md:text-4xl lg:text-5xl">
              Ready to Explore Bali?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Your adventure begins with a simple booking. We're ready to get you on the road with a quality, reliable scooter.
            </p>
          </div>

          {/* Booking Process */}
          <div className="mb-16">
            <h3 className="text-center mb-10 font-sans text-2xl font-bold text-brand-black">
              Simple Rental Process
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Link href="https://wa.me/6282247986694">
                    <Phone className="h-12 w-12 text-brand-green hover:text-brand-green/80 transition-colors" />
                  </Link>
                </div>
                <h4 className="font-bold text-lg mb-2">Contact Us</h4>
                <p className="text-gray-600">
                  Message us on WhatsApp to check availability and book your bike. Tell us which bike you want and for how long.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Users className="h-12 w-12 text-brand-green" />
                </div>
                <h4 className="font-bold text-lg mb-2">Pick-up or Delivery</h4>
                <p className="text-gray-600">
                  Come to our shop in Ungasan to pick up your bike, or we can deliver it to your hotel or villa for free in the Uluwatu area.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:translate-y-[-5px]">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="mt-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Paintbrush className="h-12 w-12 text-brand-green" />
                </div>
                <h4 className="font-bold text-lg mb-2">Ride & Explore</h4>
                <p className="text-gray-600">
                  Hit the road and explore Bali at your own pace! Return the bike when you're done - we make it easy and hassle-free.
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Valid ID (passport or driver&apos;s license)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Reference images or inspiration for your design
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Comfortable clothes that allow access to the tattoo area
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Water and snacks for longer sessions
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Payment method (cash, card, or digital payment)
                  </span>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-brand-green/10 rounded-lg">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green">
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
                  <p className="text-3xl font-bold text-brand-green">2000+</p>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded-lg">
                  <p className="text-3xl font-bold text-brand-green">5.0</p>
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
                      className="accent-brand-green"
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
                      className="accent-brand-green"
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
                  className="w-full mt-6 bg-brand-green hover:bg-brand-green/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2 pulse-glow"
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
