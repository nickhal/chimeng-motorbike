import { Star } from "lucide-react";
import Link from "next/link";

interface TestimonialCardProps {
  name: string;
  rating: number;
  review: string;
  reviewLink?: string;
}

export default function TestimonialCard({
  name,
  rating,
  review,
  reviewLink,
}: TestimonialCardProps) {
  const CardContent = () => (
    <>
      <div className="mb-4 flex items-center gap-4">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-[#F4D03F] text-[#F4D03F]"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-white">{review}</p>
    </>
  );

  if (reviewLink) {
    return (
      <Link
        href={reviewLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-xl bg-brand-black p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
          <CardContent />
        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-xl bg-brand-black p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <CardContent />
    </div>
  );
}
