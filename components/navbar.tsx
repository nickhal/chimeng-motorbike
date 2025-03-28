"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-brand-black/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="relative h-12 w-12 overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/logo.png"
              alt="Uluwatu Tattoos Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span
            className={`text-lg font-bold tracking-wider uppercase ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            ULUWATU TATTOOS
          </span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#about"
            className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-red ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            About
          </Link>
          <Link
            href="#artists"
            className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-red ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            Artists
          </Link>
          <Link
            href="#gallery"
            className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-red ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            Gallery
          </Link>
          <Link
            href="#pricing"
            className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-red ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-red ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            FAQ
          </Link>
          <Button className="bg-brand-red text-white hover:bg-brand-red/90 transition-transform hover:scale-105 uppercase tracking-wider font-medium">
            <Link href="https://wa.me/6281338702013">Book Now</Link>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu
                className={`h-6 w-6 ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-brand-black text-white border-brand-gray"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                >
                  <div className="relative h-10 w-10 overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt="Uluwatu Tattoos Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold tracking-wider uppercase">
                    ULUWATU TATTOOS
                  </span>
                </Link>
              </div>

              <nav className="mt-12 flex flex-col space-y-8">
                <Link
                  href="#about"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-red"
                >
                  About
                </Link>
                <Link
                  href="#artists"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-red"
                >
                  Artists
                </Link>
                <Link
                  href="#gallery"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-red"
                >
                  Gallery
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-red"
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-red"
                >
                  FAQ
                </Link>
                <Button className="mt-4 w-full bg-brand-red text-white hover:bg-brand-red/90 uppercase tracking-wider font-medium">
                  <Link href="https://wa.me/6281338702013">Book Now</Link>
                </Button>
              </nav>

              <div className="mt-auto pb-8">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Uluwatu Tattoos Bali. All rights
                  reserved.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
