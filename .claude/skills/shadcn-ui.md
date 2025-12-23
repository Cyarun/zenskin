# shadcn/ui & ZenSkin Design System

Comprehensive toolkit for building the ZenSkin.in premium skincare website with shadcn/ui components, following the aesthetic principles from ZenSkin.com.

## Design Philosophy

ZenSkin follows a **premium Korean skincare aesthetic**:
- Minimal, clean layouts with generous whitespace
- Luxury feel through serif + sans-serif font pairing
- Soft, muted color palette (whites, creams, grays)
- Elegant gold accents for CTAs
- Image-forward product presentation
- Smooth transitions and subtle hover effects

## MCP Server Available

The shadcn-ui MCP server provides:
- Component scaffolding and generation
- Theme configuration assistance
- Multi-framework support (React, React Native, Vue, Svelte)
- Component documentation lookup

---

## ZenSkin.in Color Palette

Based on ZenSkin.com analysis, adapted for white/cream/gray theme:

### Primary Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Pure White** | `#FFFFFF` | `0 0% 100%` | Primary background |
| **Snow White** | `#F7F9FA` | `200 20% 98%` | Section backgrounds |
| **Warm Cream** | `#FFFCF7` | `40 100% 98%` | Warm section accents |
| **Light Gray** | `#F0F0F0` | `0 0% 94%` | Subtle dividers |
| **Soft Gray** | `#E8E8E8` | `0 0% 91%` | Muted backgrounds |

### Text Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Rich Black** | `#212121` | `0 0% 13%` | Body text |
| **Pure Black** | `#000000` | `0 0% 0%` | Headlines |
| **Medium Gray** | `#646464` | `0 0% 39%` | Secondary text |
| **Muted Gray** | `#9A9A9A` | `0 0% 60%` | Placeholder, hints |

### Accent Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Champagne Gold** | `#AB8C52` | `39 36% 50%` | Primary CTA, accents |
| **Soft Gold** | `rgba(171,140,82,0.05)` | - | Gold tint backgrounds |
| **Sage Green** | `#B5CAAC` | `100 25% 73%` | Trust badges, wellness |
| **Soft Pink** | `#F9DEE5` | `344 66% 92%` | Feminine accents |
| **Warm Peach** | `#FFF0DB` | `36 100% 93%` | Highlight sections |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Border** | `#D4D4D4` | Card borders, dividers |
| **Input Border** | `#E5E5E5` | Form field borders |
| **Destructive** | `#D20000` | Error states |
| **Success** | `#B5CAAC` | Success states |

---

## Typography System

### Font Families

```css
/* Primary - Body text */
--font-sans: 'Figtree', system-ui, sans-serif;

/* Secondary - Headlines, elegance */
--font-serif: 'Amiri', 'Times New Roman', serif;

/* Accent - Subheadings */
--font-display: 'GT Standard', 'Figtree', sans-serif;
```

### Font Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Hero Headline | `45-47px` / `2.9rem` | 400 | Amiri (serif) |
| Section Heading | `33px` / `2rem` | 400 | Amiri (serif) |
| Subheading | `22px` / `1.375rem` | 500 | Figtree |
| Body Large | `16px` / `1rem` | 400 | Figtree |
| Body | `15px` / `0.9375rem` | 400 | Figtree |
| Small | `13px` / `0.8125rem` | 400 | Figtree |
| Caption | `12px` / `0.75rem` | 400 | Figtree |
| Navigation | `13px` / `0.8125rem` | 500 | Figtree, uppercase |

### Line Heights

- Headlines: `1.2`
- Body text: `1.6`
- Navigation: `1`

---

## CSS Variables for globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Figtree:wght@300;400;500;600;700&display=swap');

@layer base {
  :root {
    /* ZenSkin Light Theme - White/Cream/Gray */
    --background: 0 0% 100%;
    --foreground: 0 0% 13%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 13%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 13%;

    /* Primary - Champagne Gold */
    --primary: 39 36% 50%;
    --primary-foreground: 0 0% 100%;

    /* Secondary - Snow White sections */
    --secondary: 200 20% 98%;
    --secondary-foreground: 0 0% 13%;

    /* Accent - Warm Cream */
    --accent: 40 100% 98%;
    --accent-foreground: 0 0% 13%;

    /* Muted - Soft Gray */
    --muted: 0 0% 94%;
    --muted-foreground: 0 0% 39%;

    /* Destructive */
    --destructive: 0 100% 41%;
    --destructive-foreground: 0 0% 100%;

    /* Border & Input */
    --border: 0 0% 83%;
    --input: 0 0% 90%;
    --ring: 39 36% 50%;

    /* Radius - Slightly rounded for elegance */
    --radius: 0.5rem;

    /* Custom ZenSkin tokens */
    --gold: 39 36% 50%;
    --gold-light: 39 36% 50% / 0.05;
    --sage: 100 25% 73%;
    --cream: 40 100% 98%;
    --snow: 200 20% 98%;
  }

  .dark {
    /* ZenSkin Dark Theme - Inverted elegance */
    --background: 0 0% 8%;
    --foreground: 0 0% 95%;

    --card: 0 0% 10%;
    --card-foreground: 0 0% 95%;

    --popover: 0 0% 10%;
    --popover-foreground: 0 0% 95%;

    --primary: 39 40% 55%;
    --primary-foreground: 0 0% 8%;

    --secondary: 0 0% 12%;
    --secondary-foreground: 0 0% 95%;

    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 95%;

    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;

    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 39 40% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }

  h1, h2, h3 {
    font-family: var(--font-serif);
  }
}
```

---

## Layout Patterns from ZenSkin.com

### Homepage Sections (in order)

1. **Hero Section** - Full-width image with overlay text
2. **Tagline** - Centered text on white background
3. **Product Carousel** - Tabbed categories (Repair/Protect)
4. **Feature Banner** - 50/50 image + text split
5. **Category Grid** - 3-column image links
6. **Lifestyle Section** - Large image + 2 product cards
7. **Featured Product** - Single product highlight
8. **Testimonials** - Horizontal scrolling carousel
9. **Trust Badges** - 3-column icons
10. **Footer** - 4-column layout

### Spacing Scale

```css
/* Consistent spacing based on 4px grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
```

---

## Component Patterns

### Hero Section

```tsx
// components/hero-section.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroProps {
  title: string
  backgroundImage: string
  ctaText: string
  ctaLink: string
}

export function HeroSection({ title, backgroundImage, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight">
          {title}
        </h1>
        <Button
          asChild
          variant="outline"
          className="mt-8 border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-base"
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  )
}
```

### Product Card (ZenSkin Style)

```tsx
// components/product-card.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  href: string
  currency?: string
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  href,
  currency = '₹'
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hasDiscount = originalPrice && originalPrice > price

  return (
    <Link
      href={href}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-snow mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
            isHovered && hoverImage ? 'opacity-0' : 'opacity-100'
          )}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={name}
            fill
            className={cn(
              'object-cover transition-opacity duration-500',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base font-medium">
            {currency} {price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {currency} {originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
```

### Navigation Header (ZenSkin Style)

```tsx
// components/header.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SHOP', href: '/collections/all' },
  { label: 'CONTACT', href: '/contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <Image
            src="/logo.svg"
            alt="ZenSkin"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wider hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
```

### Testimonial Carousel

```tsx
// components/testimonials.tsx
'use client'

import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  quote: string
  author: string
}

const testimonials: Testimonial[] = [
  {
    quote: "ZenSkin's products have transformed my skin. The natural glow is undeniable!",
    author: "Priya"
  },
  {
    quote: "Finally found skincare that works. My skin feels plump, nourished, and radiant.",
    author: "Ananya"
  },
  {
    quote: "The best investment for my skin. Lightweight, effective, and luxurious.",
    author: "Meera"
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-snow">
      <div className="container">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[400px] snap-center"
              >
                <blockquote className="relative">
                  <span className="text-6xl text-primary/20 font-serif absolute -top-4 -left-2">
                    "
                  </span>
                  <p className="text-lg leading-relaxed pl-8 pr-4">
                    {item.quote}
                  </p>
                </blockquote>
                <p className="mt-4 pl-8 font-medium text-muted-foreground">
                  {item.author}
                </p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### Trust Badges Section

```tsx
// components/trust-badges.tsx
import { Leaf, Heart, Sparkles } from 'lucide-react'

const badges = [
  {
    icon: Sparkles,
    title: 'Science of Serenity',
    description: 'Combining skincare science with a serene approach to beauty.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description: 'No animal testing at any stage of production.',
  },
  {
    icon: Leaf,
    title: 'Fragrance-Free',
    description: 'All products are free of artificial fragrance.',
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
                <badge.icon className="h-8 w-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-3">{badge.title}</h3>
              <p className="text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Footer

```tsx
// components/footer.tsx
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* About */}
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At ZenSkin, we believe that true beauty is achieved through the
              harmonious balance of nature and science. Premium gut-to-skin
              wellness for radiant health.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/collections/gut-health" className="text-muted-foreground hover:text-foreground">
                  Gut Health
                </Link>
              </li>
              <li>
                <Link href="/collections/skin-care" className="text-muted-foreground hover:text-foreground">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link href="/collections/bundles" className="text-muted-foreground hover:text-foreground">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="text-sm text-muted-foreground not-italic space-y-1">
              <p>ZenSkin India Pvt. Ltd</p>
              <p>Mumbai, Maharashtra</p>
              <p>India</p>
              <p className="mt-3">
                <Link href="mailto:care@zenskin.in" className="hover:text-foreground">
                  care@zenskin.in
                </Link>
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4">Stay in Touch</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and wellness tips.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="flex-1"
              />
              <Button type="submit" variant="outline">
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ZenSkin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Button Variants (ZenSkin Style)

```tsx
// Extend shadcn button variants in components/ui/button.tsx

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-foreground bg-transparent hover:bg-foreground hover:text-background',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // ZenSkin custom variants
        gold: 'bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold))]/90',
        'outline-gold': 'border border-[hsl(var(--gold))] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))] hover:text-white',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

---

## Essential Components for ZenSkin

```bash
# Install required shadcn components
npx shadcn@latest add button card input sheet dialog \
  dropdown-menu navigation-menu form select checkbox \
  toast skeleton badge avatar separator scroll-area \
  carousel tabs accordion
```

---

## Tailwind Config Extensions

Add to `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  // ... base config
  theme: {
    extend: {
      colors: {
        gold: 'hsl(var(--gold))',
        'gold-light': 'hsl(var(--gold-light))',
        sage: 'hsl(var(--sage))',
        cream: 'hsl(var(--cream))',
        snow: 'hsl(var(--snow))',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        serif: ['Amiri', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'hero': ['2.9rem', { lineHeight: '1.2' }],
        'section': ['2rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
}
```

---

## Resources

- shadcn/ui Docs: https://ui.shadcn.com
- tweakcn Theme Editor: https://tweakcn.com
- ZenSkin.com Reference: https://zenskin.com
- Figtree Font: https://fonts.google.com/specimen/Figtree
- Amiri Font: https://fonts.google.com/specimen/Amiri
