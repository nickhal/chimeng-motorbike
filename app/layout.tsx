import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chimeng Motorbike Rental Bali | Quality Bike Rentals in Ungasan",
  description:
    "Rent quality motorbikes in Ungasan, Bali. Yamaha NMax, Honda Vario & Scoopy scooters from 100k/day. Free delivery to Uluwatu area. Daily, weekly & monthly rentals. Open 8am-7pm.",
  keywords: [
    "motorbike rental Bali",
    "scooter rental Ungasan",
    "bike rental Uluwatu",
    "Yamaha NMax rental",
    "Honda Vario rental",
    "Honda Scoopy rental",
    "motorbike rental Uluwatu",
    "Bali scooter hire",
    "cheap bike rental Bali",
    "free delivery motorbike Bali",
  ],
  authors: [{ name: "Chimeng Motorbike Rental" }],
  creator: "Chimeng Motorbike Rental",
  publisher: "Chimeng Motorbike Rental",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chimengmotorbike.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chimeng Motorbike Rental Bali | Quality Bike Rentals in Ungasan",
    description:
      "Rent quality motorbikes in Ungasan, Bali. Yamaha NMax, Honda Vario & Scoopy from 100k/day. Free delivery to Uluwatu area. Book now on WhatsApp!",
    url: "https://chimengmotorbike.com",
    siteName: "Chimeng Motorbike Rental",
    images: [
      {
        url: "/images/row-of-bike-in-garage-h.png",
        width: 1200,
        height: 630,
        alt: "Chimeng Motorbike Rental Fleet - Quality bikes in Ungasan, Bali",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chimeng Motorbike Rental Bali | Quality Bike Rentals",
    description:
      "Rent quality motorbikes in Ungasan, Bali. Yamaha NMax, Honda Vario & Scoopy from 100k/day. Free delivery available.",
    images: ["/images/row-of-bike-in-garage-h.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />

        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://chimengmotorbike.com",
              name: "Chimeng Motorbike Rental",
              image: "https://chimengmotorbike.com/images/row-of-bike-in-garage-h.png",
              description: "Quality motorbike rental service in Ungasan, Bali. Offering Yamaha NMax, Honda Vario, and Honda Scoopy scooters with free delivery to Uluwatu area.",
              url: "https://chimengmotorbike.com",
              telephone: "+6282247986694",
              priceRange: "100000-150000 IDR",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jalan Pura Masuka 33",
                addressLocality: "Ungasan",
                addressRegion: "Bali",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -8.8426,
                longitude: 115.1574,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
              sameAs: [
                "https://wa.me/6282247986694",
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: -8.8426,
                  longitude: 115.1574,
                },
                geoRadius: "10000",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Motorbike Rental Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Honda Scoopy Rental",
                      description: "Perfect for city riding and short trips. Fuel-efficient and easy to handle.",
                    },
                    price: "100000",
                    priceCurrency: "IDR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "100000",
                      priceCurrency: "IDR",
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: "1",
                        unitCode: "DAY",
                      },
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Honda Vario Rental",
                      description: "Popular and reliable automatic scooter. Great for daily commuting and exploring Bali.",
                    },
                    price: "100000",
                    priceCurrency: "IDR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "100000",
                      priceCurrency: "IDR",
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: "1",
                        unitCode: "DAY",
                      },
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Yamaha NMax Rental",
                      description: "Premium automatic scooter with extra power and comfort for longer rides.",
                    },
                    price: "150000",
                    priceCurrency: "IDR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "150000",
                      priceCurrency: "IDR",
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: "1",
                        unitCode: "DAY",
                      },
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N8T28NHH');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8T28NHH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
