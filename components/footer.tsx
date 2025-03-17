import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20TATO%20NEW%20BLANK-WbMeQlhj3bwu1bFLoTX6Yuk1doGjT7.png"
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
                href="#"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white/10 p-2 transition-all hover:bg-brand-red hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Jl. Pura Masuka No.41, Ungasan</li>
              <li>Kec. Kuta Sel., Kabupaten Badung</li>
              <li>Bali 80361, Indonesia</li>
              <li className="pt-2">
                <Link
                  href="tel:+6281234567890"
                  className="transition-colors hover:text-brand-red"
                >
                  +62 812-3456-7890
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@uluwatutattoos.com"
                  className="transition-colors hover:text-brand-red"
                >
                  info@uluwatutattoos.com
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
