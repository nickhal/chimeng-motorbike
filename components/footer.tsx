import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Uluwatu Tattoos Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-lg font-bold tracking-wider uppercase">
                ULUWATU TATTOOS
              </span>
            </div>
            <p className="mt-4 text-gray-400">
              Blending traditional Balinese artistry with modern tattoo
              techniques to create unique, personalized body art.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="https://www.instagram.com/andreyoga.tattoos/"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://wa.me/6281338702013"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <PhoneCall className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link
                href="https://wa.me/6281338702013"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider">
              Address
            </h3>
            <ul className="space-y-6 text-gray-400">
              <li>
                <Link
                  href="https://maps.google.com/?q=Jl.+Labuansait+No.81,+Pecatu,+Uluwatu,+Kabupaten+Badung,+Bali+80361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:text-brand-red hover:underline transition-colors"
                >
                  Jl. Labuansait No.81, Pecatu,
                  <br />
                  Uluwatu, Kabupaten Badung,
                  <br />
                  Bali 80361
                </Link>
              </li>
              <li>
                <Link
                  href="https://maps.google.com/?q=Jl.+Pura+Masuka+No.41,+Ungasan,+Kec.+Kuta+Sel.,+Kabupaten+Badung,+Bali+80361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:text-brand-red hover:underline transition-colors"
                >
                  Jl. Pura Masuka No.41, Ungasan
                  <br />
                  Kec. Kuta Sel., Kabupaten Badung
                  <br />
                  Bali 80361, Indonesia
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
                <span>Monday - Friday</span>
                <span>9am - 8pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9am - 8pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9am - 8pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Uluwatu Tattoos Bali. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
