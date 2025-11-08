import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/images/chimeng.png"
                  alt="Chimeng Motorbike Rental Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-lg font-bold tracking-wider uppercase">
                CHIMENG MOTORBIKE
              </span>
            </div>
            <p className="mt-4 text-gray-400">
              Quality motorbike rentals in Ungasan, Bali. Yamaha NMax, Honda
              Vario, Honda Scoopy, and Yamaha Gear scooters with flexible rental
              periods and free delivery options. Starting from 100k IDR/day.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="https://www.instagram.com/chimeng_tattoo/"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-green hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://wa.me/6282247986694"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-green hover:scale-110"
              >
                <PhoneCall className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link
                href="https://wa.me/6282247986694"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-green hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider">
              Location
            </h3>
            <ul className="space-y-6 text-gray-400">
              <li>
                <Link
                  href="https://maps.google.com/?q=Jalan+Pura+Masuka+33,+Ungasan,+Bali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:text-brand-green hover:underline transition-colors"
                >
                  Jalan Pura Masuka 33
                  <br />
                  Ungasan, Bali
                  <br />
                  Indonesia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider">
              Hours
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Monday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Tuesday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Wednesday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday</span>
                <span>8am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Friday</span>
                <span>8am - 7pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Chimeng Motorbike Rental. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
