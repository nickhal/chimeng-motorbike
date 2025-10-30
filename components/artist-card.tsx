"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ArtistCardProps {
  name: string
  image: string
  specialty: string
  description: string
}

export default function ArtistCard({ name, image, specialty, description }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[350px] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="outline"
              className="w-full border-white text-white hover:bg-brand-green hover:border-brand-green uppercase tracking-wider"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-1 font-sans text-xl font-bold text-brand-black uppercase">{name}</h3>
        <p className="mb-3 text-sm font-medium text-brand-green uppercase tracking-wider">{specialty}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

