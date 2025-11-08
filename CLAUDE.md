# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Chimeng Motorbike Rental, a motorbike rental business in Ungasan, Bali. The site is a static export built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components, featuring a tropical/surf aesthetic matching the business's Bali brand identity.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production (static export)
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

The site runs at http://localhost:3000 during development.

## Project Architecture

### Static Export Configuration
- Configured for static site generation (`output: "export"` in next.config.ts)
- Images are unoptimized for static hosting compatibility
- Builds to `/out` directory for deployment to Hostinger

### Tech Stack
- **Framework**: Next.js 15.1.0 (App Router)
- **React**: 19.0.0 with Client Components
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS with custom brand colors
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Analytics**: Google Tag Manager (GTM-N8T28NHH)

### File Structure
```
app/
  layout.tsx        # Root layout with fonts (Montserrat, Playfair Display)
  page.tsx          # Main homepage (client component)
  globals.css       # Tailwind + custom CSS variables

components/
  ui/               # shadcn/ui components (button, card, accordion, etc.)
  navbar.tsx        # Navigation header
  footer.tsx        # Footer with contact info
  pricing-card.tsx  # Bike rental pricing display
  testimonial-card.tsx # Customer reviews
  location-card.tsx # Pick-up/delivery location info
  gallery-slider.tsx # Image carousel with balanced shuffle

lib/
  utils.ts          # Tailwind merge utility (cn)

public/images/      # Static assets (bikes, logos, favicons)
```

### Design System

**Brand Colors** (defined in tailwind.config.ts):
- `brand-green`: #4A7C3E - Primary action color
- `brand-yellow`: #F4D03F - Accent/badges
- `brand-red`: #DC3545 - Logo accent
- `brand-ocean`: #00A6B5 - Tropical blue accent
- `brand-sand`: #F5E6D3 - Warm background tone
- `brand-black`: #1C1C1C - Typography
- `brand-gray`: #6B7280 - Secondary text

**Typography**:
- Sans: Montserrat (headings, body)
- Serif: Playfair Display (decorative)

**Path Aliases**:
- `@/` maps to project root
- Import components as `@/components/ui/button`

### Key Implementation Patterns

**Client-Side Gallery Shuffle**:
The homepage gallery uses a balanced shuffle algorithm to ensure even distribution of bike categories (NMax, Vario, Scoopy, all) while randomizing display order. This prevents category clustering and ensures the gallery feels fresh on each visit.

**Static Assets**:
All images are in `/public/images/` with descriptive names indicating bike type and orientation (h = horizontal, v = vertical).

**Component Philosophy**:
- Reusable UI primitives live in `components/ui/`
- Page-specific components are in `components/`
- All components use TypeScript with proper interfaces
- Responsive design with mobile-first approach

**Styling Approach**:
- Utility-first with Tailwind CSS
- CSS variables for theme colors (both light/dark defined)
- Custom animations in globals.css (float, flame, pulse-glow)
- Generous container padding for spacious layout

### External Integrations

**WhatsApp Booking**: Primary CTA links to wa.me/6282247986694 for direct booking
**Google Maps**: Embedded location for shop address (Jalan Pura Masuka 33, Ungasan)
**Google Reviews**: Links to Google Business profile for testimonials
**Analytics**: GTM container for tracking (ID: GTM-N8T28NHH)

### Deployment Notes

The site is deployed to Hostinger as a static export. After running `npm run build`, the `/out` directory contains the complete static site ready for upload.

### Important Constraints

- No server-side features (API routes, server actions) due to static export
- All interactivity must be client-side (marked with "use client")
- Images must use `unoptimized: true` for static hosting
- No dynamic routes or ISR - single-page application architecture
