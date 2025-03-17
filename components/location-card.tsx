"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LocationCardProps {
  name: string;
  image: string;
  address: string;
  hours: string;
  phone: string;
  isNew?: boolean;
  mapUrl: string;
  description: string;
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
}: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[250px] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Uluwatu Tattoos ${name} Location`}
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
              <Badge className="mt-2 bg-brand-red text-white uppercase tracking-wider animate-pulse">
                New Location
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="mb-6 text-gray-600">{description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-brand-red mt-1 flex-shrink-0" />
            <p className="text-gray-700">{address}</p>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-brand-red mt-1 flex-shrink-0" />
            <p className="text-gray-700">{hours}</p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-brand-red mt-1 flex-shrink-0" />
            <p className="text-gray-700">
              <Link
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                className="hover:text-brand-red transition-colors hover:underline"
              >
                {phone}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
          >
            <Link
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              View on Map
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
            <Link href="https://wa.me/6281338702013">Book at {name}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
