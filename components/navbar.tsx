"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-brand-black/95 backdrop-blur-md shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="relative h-12 w-12 overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/chimeng.png"
              alt="Chimeng Motorbike Rental Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-wider uppercase text-white">
            CHIMENG MOTORBIKE
          </span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#about"
            className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-green text-white"
          >
            About
          </Link>
          <Link
            href="#fleet"
            className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-green text-white"
          >
            Our Fleet
          </Link>
          <Link
            href="#gallery"
            className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-green text-white"
          >
            Gallery
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-green text-white"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-green text-white"
          >
            FAQ
          </Link>
          <Button className="bg-brand-green text-white hover:bg-brand-green/90 transition-transform hover:scale-105 uppercase tracking-wider font-bold shadow-lg px-6">
            <Link href="https://wa.me/6282247986694">Book Now</Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-brand-black text-white border-brand-gray"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative h-10 w-10 overflow-hidden">
                    <Image
                      src="/images/chimeng.png"
                      alt="Chimeng Motorbike Rental Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold tracking-wider uppercase">
                    CHIMENG MOTORBIKE
                  </span>
                </Link>
              </div>

              <nav className="mt-12 flex flex-col space-y-8">
                <Link
                  href="#about"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-green"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#fleet"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-green"
                  onClick={() => setIsOpen(false)}
                >
                  Our Fleet
                </Link>
                <Link
                  href="#gallery"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-green"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-green"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-lg font-medium tracking-wide uppercase transition-colors hover:text-brand-green"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
                <Button
                  className="mt-4 w-full bg-brand-green text-white hover:bg-brand-green/90 uppercase tracking-wider font-bold shadow-lg py-3"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="https://wa.me/6282247986694">Book Now</Link>
                </Button>
              </nav>

              <div className="mt-auto pb-8">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Chimeng Motorbike Rental. All
                  rights reserved.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
