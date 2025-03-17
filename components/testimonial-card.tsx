import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  rating: number
  review: string
  image: string
}

export default function TestimonialCard({ name, rating, review, image }: TestimonialCardProps) {
  return (
    <div className="rounded-xl bg-brand-gray p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-red">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-brand-red text-brand-red" : "text-gray-500"}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-300">{review}</p>
    </div>
  )
}

