# UI/UX Design Intelligence

Comprehensive UI/UX design skill for building responsive, accessible web and mobile interfaces.

## When to Use

Use this skill when:
- Planning, building, or designing UI/UX
- Creating websites, landing pages, dashboards, e-commerce, mobile apps
- Implementing buttons, modals, navbars, sidebars, cards, tables, forms, charts
- Working with design styles: glassmorphism, minimalism, neumorphism, bento grid, dark mode
- Choosing color palettes, typography, font pairings, animations, layouts

## Supported Stacks

- React / Next.js
- React Native
- TailwindCSS
- shadcn/ui + Radix UI

## Design Principles

### 1. Visual Hierarchy
- Use size, color, and spacing to guide user attention
- Primary actions should be visually prominent
- Secondary content should recede

### 2. Consistency
- Maintain consistent spacing (8px grid system)
- Use design tokens for colors, typography, shadows
- Reuse component patterns across the app

### 3. Accessibility (WCAG 2.1 AA)
- Minimum contrast ratio 4.5:1 for text
- Focus indicators for keyboard navigation
- Screen reader support with proper ARIA labels
- Touch targets minimum 44x44px on mobile

## Color Palettes

### ZenSkin Brand Colors
```css
/* Primary - Green (Nature, Health, Growth) */
--primary-50: #f0fdf4;
--primary-100: #dcfce7;
--primary-500: #22c55e;
--primary-600: #16a34a;
--primary-700: #15803d;

/* Secondary - Purple (Premium, Wellness) */
--secondary-50: #fdf4ff;
--secondary-500: #d946ef;
--secondary-600: #c026d3;

/* Neutral */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;

/* Semantic */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Dark Mode
```css
/* Dark mode overrides */
.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  --primary: #4ade80;
  --muted: #334155;
}
```

## Typography

### Font Pairing
```css
/* Display headings */
font-family: 'DM Sans', system-ui, sans-serif;

/* Body text */
font-family: 'Inter', system-ui, sans-serif;
```

### Type Scale
```css
/* Responsive typography */
.text-display { font-size: clamp(2rem, 5vw, 3.75rem); }
.text-h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); }
.text-h2 { font-size: clamp(1.5rem, 3vw, 1.875rem); }
.text-h3 { font-size: clamp(1.25rem, 2.5vw, 1.5rem); }
.text-body { font-size: 1rem; }
.text-small { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
```

## Spacing System (8px Grid)

```css
/* Spacing tokens */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Component Patterns

### Button Variants
```typescript
// Primary Button
<button className="
  bg-primary-600 text-white
  px-6 py-3 rounded-xl font-medium
  hover:bg-primary-700 active:scale-[0.98]
  transition-all duration-150
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
">
  Add to Cart
</button>

// Secondary Button
<button className="
  bg-white text-gray-900 border border-gray-200
  px-6 py-3 rounded-xl font-medium
  hover:bg-gray-50 active:scale-[0.98]
  transition-all duration-150
">
  Learn More
</button>

// Ghost Button
<button className="
  text-primary-600 px-4 py-2 rounded-lg font-medium
  hover:bg-primary-50
  transition-colors duration-150
">
  View All
</button>
```

### Card Patterns
```typescript
// Product Card
<div className="
  bg-white rounded-2xl shadow-soft overflow-hidden
  hover:shadow-elevated transition-shadow duration-300
  group cursor-pointer
">
  <div className="aspect-square overflow-hidden">
    <img
      src={product.image}
      className="w-full h-full object-cover
        group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="p-4">
    <p className="text-sm text-gray-500">{product.category}</p>
    <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
    <p className="text-lg font-bold text-primary-600 mt-2">
      ₹{product.price.toLocaleString('en-IN')}
    </p>
  </div>
</div>

// Feature Card (Bento Grid)
<div className="
  bg-gradient-to-br from-primary-50 to-white
  rounded-3xl p-8 border border-primary-100
">
  <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
    <Icon className="w-6 h-6 text-primary-600" />
  </div>
  <h3 className="text-xl font-semibold mt-6">{title}</h3>
  <p className="text-gray-600 mt-2">{description}</p>
</div>
```

### Form Elements
```typescript
// Input Field
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input
    type="email"
    className="
      w-full px-4 py-3 rounded-xl border border-gray-200
      focus:border-primary-500 focus:ring-2 focus:ring-primary-100
      transition-all duration-150 outline-none
      placeholder:text-gray-400
    "
    placeholder="you@example.com"
  />
</div>

// Select
<select className="
  w-full px-4 py-3 rounded-xl border border-gray-200
  focus:border-primary-500 focus:ring-2 focus:ring-primary-100
  bg-white appearance-none
  bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-right-4
">
  <option>Select size</option>
  <option>30 Capsules</option>
  <option>60 Capsules</option>
</select>
```

### Navigation Patterns
```typescript
// Mobile Bottom Nav
<nav className="
  fixed bottom-0 inset-x-0 bg-white border-t border-gray-100
  pb-safe-bottom
">
  <div className="flex justify-around py-2">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className={cn(
          'flex flex-col items-center py-2 px-4',
          isActive ? 'text-primary-600' : 'text-gray-500'
        )}
      >
        <item.icon className="w-6 h-6" />
        <span className="text-xs mt-1">{item.label}</span>
      </a>
    ))}
  </div>
</nav>

// Desktop Header
<header className="
  sticky top-0 z-50 bg-white/80 backdrop-blur-lg
  border-b border-gray-100
">
  <div className="container mx-auto px-4 h-16 flex items-center justify-between">
    <Logo />
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900">
          {link.label}
        </a>
      ))}
    </nav>
    <div className="flex items-center gap-4">
      <CartButton />
      <ProfileButton />
    </div>
  </div>
</header>
```

## Responsive Layouts

### Container
```typescript
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Max width: 1280px, centered with responsive padding */}
</div>
```

### Grid Layouts
```typescript
// Product Grid
<div className="
  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
  gap-4 sm:gap-6
">
  {products.map((p) => <ProductCard key={p.id} product={p} />)}
</div>

// Bento Grid
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 auto-rows-[200px]
">
  <div className="md:col-span-2 md:row-span-2">{/* Hero item */}</div>
  <div>{/* Regular item */}</div>
  <div>{/* Regular item */}</div>
  <div className="md:col-span-2">{/* Wide item */}</div>
</div>
```

## Animation Patterns

### Micro-interactions
```css
/* Button press */
.btn-press:active {
  transform: scale(0.98);
}

/* Card hover lift */
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15);
}

/* Fade in on load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

### Loading States
```typescript
// Skeleton
<div className="animate-pulse">
  <div className="aspect-square bg-gray-200 rounded-2xl" />
  <div className="mt-4 space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-6 bg-gray-200 rounded w-1/2" />
  </div>
</div>

// Spinner
<div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
```

## Mobile-First Breakpoints

```css
/* Default: Mobile (< 640px) */
.component { padding: 1rem; }

/* sm: Large phones (≥ 640px) */
@media (min-width: 640px) {
  .component { padding: 1.25rem; }
}

/* md: Tablets (≥ 768px) */
@media (min-width: 768px) {
  .component { padding: 1.5rem; }
}

/* lg: Laptops (≥ 1024px) */
@media (min-width: 1024px) {
  .component { padding: 2rem; }
}

/* xl: Desktops (≥ 1280px) */
@media (min-width: 1280px) {
  .component { padding: 3rem; }
}
```

## E-commerce Specific Patterns

### Price Display
```typescript
<div className="flex items-baseline gap-2">
  <span className="text-2xl font-bold text-gray-900">
    ₹{salePrice.toLocaleString('en-IN')}
  </span>
  {originalPrice > salePrice && (
    <>
      <span className="text-lg text-gray-400 line-through">
        ₹{originalPrice.toLocaleString('en-IN')}
      </span>
      <span className="text-sm font-medium text-green-600">
        {Math.round((1 - salePrice / originalPrice) * 100)}% off
      </span>
    </>
  )}
</div>
```

### Add to Cart Button
```typescript
<button
  onClick={handleAddToCart}
  disabled={isLoading || !inStock}
  className={cn(
    'w-full py-4 rounded-xl font-medium transition-all',
    inStock
      ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.99]'
      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
  )}
>
  {isLoading ? (
    <Spinner className="mx-auto" />
  ) : inStock ? (
    'Add to Cart'
  ) : (
    'Out of Stock'
  )}
</button>
```

### Rating Display
```typescript
<div className="flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      className={cn(
        'w-4 h-4',
        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
      )}
    />
  ))}
  <span className="text-sm text-gray-500 ml-2">
    ({reviewCount} reviews)
  </span>
</div>
```
