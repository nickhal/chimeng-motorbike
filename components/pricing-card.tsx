"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: string
  image: string
  description: string
}

export default function PricingCard({ title, price, image, description }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-transparent">
          <div className="absolute bottom-4 left-4">
            <h3 className="font-sans text-xl font-bold text-white uppercase">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-end justify-between">
          <span className="text-2xl font-bold text-brand-black">{price}</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs uppercase tracking-wider border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
          >
            Learn More
          </Button>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

