"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LocationCardProps {
  name: string;
  image?: string;
  address: string;
  hours: string;
  phone: string;
  isNew?: boolean;
  mapUrl: string;
  description: string;
  showMapEmbed?: boolean;
}

export default function LocationCard({
  name,
  image,
  address,
  hours,
  phone,
  isNew = false,
  mapUrl,
  description,
  showMapEmbed = false,
}: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[250px] overflow-hidden">
        {showMapEmbed ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63321.67757775974!2d115.1207637!3d-8.8014212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b4abf8623db%3A0xe9a8cd39f3dfa1ae!2sBukit%20Peninsula!5e0!3m2!1sen!2sus!4v1699999999999"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        ) : (
          <>
            <Image
              src={image || "/placeholder.svg"}
              alt={`Chimeng Motorbike Rental ${name}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-70"
              }`}
            >
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-sans text-2xl font-bold text-white uppercase">
                  {name}
                </h3>
                {isNew && (
                  <Badge className="mt-2 bg-brand-green text-white uppercase tracking-wider animate-pulse">
                    New Location
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
        {showMapEmbed && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 to-transparent p-6 pointer-events-none">
            <h3 className="font-sans text-2xl font-bold text-white uppercase">
              {name}
            </h3>
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="mb-6 text-gray-600">{description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
            <p className="text-gray-700">{address}</p>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
            <p className="text-gray-700">{hours}</p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
            <p className="text-gray-700">
              <Link
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                className="hover:text-brand-green transition-colors hover:underline"
              >
                {phone}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <Button
            variant="outline"
            className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white w-full sm:w-auto"
          >
            <Link
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full"
            >
              View on Map
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button className="bg-brand-green hover:bg-brand-green/90 text-white w-full sm:w-auto">
            <Link
              href="https://wa.me/6282247986694"
              className="w-full text-center"
            >
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
