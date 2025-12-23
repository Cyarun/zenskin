# ZenSkin.in Design System

Comprehensive design system documentation for ZenSkin.in, a premium gut-to-skin wellness D2C brand. Based on analysis of ZenSkin.com Korean skincare aesthetic.

## Design Philosophy

### Core Principles

1. **Premium Minimalism** - Clean, uncluttered layouts with generous whitespace
2. **Nature Meets Science** - Organic shapes balanced with precise grids
3. **Luxury Through Restraint** - Limited color palette, elegant typography
4. **Image-Forward** - Products are heroes, photography takes center stage
5. **Serene Experience** - Calm, spa-like digital environment

### Visual Language

- **Mood**: Calm, luxurious, trustworthy, natural
- **Style**: Modern Korean minimalism
- **Feel**: Light, airy, premium, serene

---

## Color System

### Brand Palette

#### Primary Backgrounds
```
Pure White    #FFFFFF    rgb(255, 255, 255)    Main background
Snow White    #F7F9FA    rgb(247, 249, 250)    Section backgrounds
Warm Cream    #FFFCF7    rgb(255, 252, 247)    Warm accent sections
Light Gray    #F0F0F0    rgb(240, 240, 240)    Subtle dividers
Soft Gray     #E8E8E8    rgb(232, 232, 232)    Muted backgrounds
```

#### Text Colors
```
Rich Black    #212121    rgb(33, 33, 33)       Body text
Pure Black    #000000    rgb(0, 0, 0)          Headlines
Medium Gray   #646464    rgb(100, 100, 100)    Secondary text
Muted Gray    #9A9A9A    rgb(154, 154, 154)    Placeholders, hints
```

#### Accent Colors
```
Champagne Gold   #AB8C52    rgb(171, 140, 82)     Primary CTA, accents
Gold Light       rgba(171, 140, 82, 0.05)        Gold tint backgrounds
Sage Green       #B5CAAC    rgb(181, 202, 172)    Trust badges, wellness
Soft Pink        #F9DEE5    rgb(249, 222, 229)    Feminine accents
Warm Peach       #FFF0DB    rgb(255, 240, 219)    Highlight sections
```

#### Semantic Colors
```
Success     #B5CAAC    Sage green - positive actions
Error       #D20000    Red - errors, destructive
Warning     #AB8C52    Gold - warnings, attention
Info        #646464    Gray - informational
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page background | Pure White | Primary canvas |
| Section alternates | Snow / Cream | Create visual rhythm |
| Headlines | Pure Black | Maximum contrast |
| Body text | Rich Black | Easy reading |
| Secondary text | Medium Gray | Supporting info |
| Primary CTA | Gold | Stand out |
| Secondary CTA | Black outline | Elegant alternative |
| Dividers | Light Gray | Subtle separation |
| Hover states | Gold / Black | Interactive feedback |

### Dark Mode Adaptation

```
Background       #141414    Near black
Card Background  #1A1A1A    Slightly lighter
Text Primary     #F5F5F5    Off-white
Text Secondary   #9A9A9A    Muted gray
Accent           #C9A86C    Brighter gold
Border           #333333    Subtle borders
```

---

## Typography

### Font Stack

```css
/* Primary - Body Text */
font-family: 'Figtree', system-ui, -apple-system, sans-serif;

/* Secondary - Headlines */
font-family: 'Amiri', 'Times New Roman', Georgia, serif;

/* Accent - Subheadings (optional) */
font-family: 'GT Standard', 'Figtree', sans-serif;
```

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Name | Size (Desktop) | Size (Mobile) | Weight | Line Height | Usage |
|------|----------------|---------------|--------|-------------|-------|
| Hero | 47px / 2.9rem | 32px / 2rem | 400 | 1.2 | Hero headlines |
| H1 | 45px / 2.8rem | 28px / 1.75rem | 400 | 1.2 | Page titles |
| H2 | 33px / 2rem | 24px / 1.5rem | 400 | 1.2 | Section heads |
| H3 | 22px / 1.375rem | 18px / 1.125rem | 500 | 1.4 | Subsections |
| Body Large | 16px / 1rem | 16px / 1rem | 400 | 1.6 | Lead paragraphs |
| Body | 15px / 0.9375rem | 14px / 0.875rem | 400 | 1.6 | Default text |
| Small | 13px / 0.8125rem | 12px / 0.75rem | 400 | 1.5 | Captions, labels |
| Caption | 12px / 0.75rem | 11px / 0.6875rem | 400 | 1.5 | Fine print |
| Nav | 13px / 0.8125rem | 12px / 0.75rem | 500 | 1 | Navigation |

### Typography Rules

1. **Headlines use serif** (Amiri) for elegance
2. **Body uses sans-serif** (Figtree) for readability
3. **Navigation is uppercase** with letter-spacing: 0.05em
4. **Never exceed 70 characters** per line for body text
5. **Use proper hierarchy** - only one H1 per page

---

## Spacing System

### Base Unit: 4px

All spacing derives from a 4px base grid.

```
4px   = 0.25rem  = space-1
8px   = 0.5rem   = space-2
12px  = 0.75rem  = space-3
16px  = 1rem     = space-4
24px  = 1.5rem   = space-6
32px  = 2rem     = space-8
48px  = 3rem     = space-12
64px  = 4rem     = space-16
96px  = 6rem     = space-24
128px = 8rem     = space-32
```

### Section Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section padding (vertical) | 96px / 6rem | 64px / 4rem |
| Section padding (horizontal) | 32px / 2rem | 16px / 1rem |
| Component gap | 32px / 2rem | 24px / 1.5rem |
| Card padding | 24px / 1.5rem | 16px / 1rem |
| Grid gap | 32px / 2rem | 16px / 1rem |
| Text block gap | 16px / 1rem | 12px / 0.75rem |

### Container Widths

```
Max content width: 1440px
Content area: 1280px
Narrow content: 768px (for text-heavy pages)
Mobile max: 100% with 16px padding
```

---

## Layout Patterns

### Grid System

```
Desktop: 12-column grid, 32px gutter
Tablet: 8-column grid, 24px gutter
Mobile: 4-column grid, 16px gutter
```

### Common Layouts

#### Two-Column (50/50)
```tsx
<div className="grid md:grid-cols-2 gap-8">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

#### Three-Column
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

#### Product Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {products.map(product => <ProductCard {...product} />)}
</div>
```

### Homepage Section Order

1. **Hero** - Full-bleed image with overlay
2. **Tagline** - Centered on white
3. **Product Carousel** - Tabbed categories
4. **Feature Banner** - Image + text split
5. **Category Grid** - 3 collection links
6. **Lifestyle Section** - Large image + products
7. **Featured Product** - Single highlight
8. **Testimonials** - Scrolling carousel
9. **Trust Badges** - 3 icons with text
10. **Footer** - 4-column layout

---

## Component Specifications

### Buttons

#### Primary Button (Gold)
```
Background: #AB8C52
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 4px
Font: 14px Figtree, 500 weight
Hover: darken 10%
```

#### Secondary Button (Outline)
```
Background: transparent
Border: 1px solid #212121
Text: #212121
Padding: 12px 24px
Border-radius: 4px
Hover: background #212121, text #FFFFFF
```

#### Ghost Button
```
Background: transparent
Text: #212121
Padding: 12px 24px
Hover: background rgba(0,0,0,0.05)
```

### Product Cards

```
Container: white background
Image: aspect-ratio 1:1, object-cover
Image hover: swap to second image (500ms fade)
Title: 14px, medium weight, center aligned
Price: 16px, medium weight, center aligned
Spacing: 16px padding
```

### Navigation

```
Height: 64px
Background: white
Border-bottom: 1px solid #E8E8E8
Logo: centered on mobile, left on desktop
Links: 13px uppercase, 500 weight, 0.05em spacing
Icons: 20px, right aligned
Sticky: yes, with backdrop-blur on scroll
```

### Forms

```
Input height: 48px
Border: 1px solid #E5E5E5
Border-radius: 4px
Focus border: #AB8C52
Padding: 0 16px
Font: 15px Figtree
Label: 13px, 500 weight, above input
Error: #D20000 text below input
```

### Cards

```
Background: white
Border: none or 1px solid #F0F0F0
Border-radius: 8px
Shadow: 0 2px 8px rgba(0,0,0,0.05) (optional)
Padding: 24px
```

---

## Imagery Guidelines

### Product Photography

- **Background**: Pure white (#FFFFFF) or light cream
- **Lighting**: Soft, diffused, no harsh shadows
- **Angle**: Front-facing or 3/4 angle
- **Props**: Minimal, natural elements (leaves, stones)
- **Format**: Square (1:1) for grids, 3:4 for features

### Lifestyle Photography

- **Style**: Bright, airy, spa-like environments
- **Models**: Diverse, natural beauty, minimal makeup
- **Setting**: Clean bathrooms, nature, soft textiles
- **Colors**: Muted, complementing brand palette

### Image Specifications

| Use Case | Aspect Ratio | Min Size | Format |
|----------|--------------|----------|--------|
| Product grid | 1:1 | 800x800 | WebP, JPG |
| Product detail | 1:1 | 1200x1200 | WebP, JPG |
| Hero banner | 16:9 | 1920x1080 | WebP, JPG |
| Feature banner | 4:3 or 1:1 | 1200x900 | WebP, JPG |
| Collection | 3:4 | 600x800 | WebP, JPG |
| Blog/OG | 1.91:1 | 1200x630 | JPG |

---

## Animation & Interaction

### Timing

```
Fast: 150ms (micro-interactions)
Normal: 300ms (standard transitions)
Slow: 500ms (page transitions, image fades)
```

### Easing

```
Default: ease-out
Enter: cubic-bezier(0, 0, 0.2, 1)
Exit: cubic-bezier(0.4, 0, 1, 1)
```

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Product Image Swap
```css
.product-image {
  transition: opacity 500ms ease;
}
.product-card:hover .product-image-primary {
  opacity: 0;
}
.product-card:hover .product-image-secondary {
  opacity: 1;
}
```

### Hover States

- Buttons: darken/lighten background, cursor pointer
- Links: underline or color change
- Cards: subtle shadow increase
- Images: slight scale (1.02) or swap

---

## Responsive Breakpoints

```css
/* Mobile First */
xs: 375px    /* iPhone SE */
sm: 640px    /* Large phones */
md: 768px    /* Tablets portrait */
lg: 1024px   /* Tablets landscape, small laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Mobile Considerations

1. **Touch targets**: Minimum 44x44px
2. **Font sizes**: Never below 14px for body
3. **Spacing**: Reduce by ~30% from desktop
4. **Navigation**: Hamburger menu below 1024px
5. **Images**: Serve optimized sizes via srcset
6. **CTAs**: Full-width buttons on mobile

---

## Accessibility

### Color Contrast

- Large text (18px+): minimum 3:1 ratio
- Body text: minimum 4.5:1 ratio
- UI components: minimum 3:1 ratio

### Focus States

```css
:focus-visible {
  outline: 2px solid #AB8C52;
  outline-offset: 2px;
}
```

### Screen Reader

- All images need alt text
- Form inputs need labels
- Use semantic HTML (nav, main, footer)
- Skip to content link

---

## Icons

### Recommended Library

**Lucide React** - Clean, consistent line icons

```bash
npm install lucide-react
```

### Common Icons

```tsx
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Heart,
  Star,
  Check,
  Plus,
  Minus,
  Leaf,       // Natural/organic
  Sparkles,   // Premium/science
  Shield,     // Protection
} from 'lucide-react'
```

### Icon Sizing

- Navigation: 20px
- Buttons: 16px
- Inline: 14px
- Feature icons: 32-48px

---

## Quick Reference

### Tailwind Classes Cheat Sheet

```tsx
// Hero Section
className="relative h-[80vh] min-h-[600px]"

// Section
className="py-16 md:py-24"

// Container
className="container mx-auto px-4"

// Heading
className="font-serif text-section md:text-hero"

// Body Text
className="text-body text-medium-gray"

// Product Grid
className="grid grid-cols-2 md:grid-cols-4 gap-4"

// Button Primary
className="bg-gold text-white px-6 py-3 hover:bg-gold-dark"

// Button Outline
className="border border-rich-black px-6 py-3 hover:bg-rich-black hover:text-white"

// Card
className="bg-white rounded-lg p-6 shadow-card"

// Snow Section
className="bg-snow py-16"

// Cream Section
className="bg-cream py-16"
```

---

## Resources

- Figma Design System: (to be created)
- Storybook: (to be created)
- shadcn/ui: https://ui.shadcn.com
- Lucide Icons: https://lucide.dev
- Figtree Font: https://fonts.google.com/specimen/Figtree
- Amiri Font: https://fonts.google.com/specimen/Amiri
