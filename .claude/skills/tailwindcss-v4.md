# TailwindCSS v4 Styling

Utility-first CSS framework for responsive design, dark mode, and custom theming.

## When to Use

Use this skill when:
- Styling with Tailwind utility classes
- Implementing responsive designs
- Adding dark mode support
- Configuring Tailwind themes
- Building design systems

## TailwindCSS v4 Configuration

### CSS-First Configuration
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary-50: oklch(0.97 0.02 150);
  --color-primary-100: oklch(0.94 0.05 150);
  --color-primary-500: oklch(0.65 0.2 150);
  --color-primary-600: oklch(0.55 0.2 150);
  --color-primary-700: oklch(0.45 0.18 150);

  --color-secondary-500: oklch(0.65 0.25 320);
  --color-secondary-600: oklch(0.55 0.25 320);

  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'DM Sans', system-ui, sans-serif;

  /* Spacing */
  --spacing-safe-top: env(safe-area-inset-top);
  --spacing-safe-bottom: env(safe-area-inset-bottom);

  /* Shadows */
  --shadow-soft: 0 2px 15px -3px rgb(0 0 0 / 0.07);
  --shadow-elevated: 0 10px 40px -10px rgb(0 0 0 / 0.15);

  /* Border radius */
  --radius-4xl: 2rem;
  --radius-5xl: 2.5rem;

  /* Animations */
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Dark Mode with CSS Variables
```css
@theme {
  --color-background: white;
  --color-foreground: oklch(0.15 0 0);
  --color-card: white;
  --color-muted: oklch(0.96 0 0);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.15 0.02 260);
    --color-foreground: oklch(0.98 0 0);
    --color-card: oklch(0.2 0.02 260);
    --color-muted: oklch(0.25 0.02 260);
  }
}
```

## Responsive Design

### Mobile-First Breakpoints
```
Default   : 0px      (Mobile phones)
sm:       : 640px    (Large phones)
md:       : 768px    (Tablets)
lg:       : 1024px   (Laptops)
xl:       : 1280px   (Desktops)
2xl:      : 1536px   (Large screens)
```

### Responsive Patterns
```html
<!-- Responsive padding -->
<div class="p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12">

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

<!-- Responsive typography -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">

<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row gap-4">

<!-- Show/hide by breakpoint -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>
```

### Container Queries (v4)
```html
<!-- Container queries -->
<div class="@container">
  <div class="@sm:flex @sm:gap-4 @lg:grid @lg:grid-cols-3">
    <!-- Responds to container size, not viewport -->
  </div>
</div>
```

## Component Patterns

### Buttons
```html
<!-- Primary -->
<button class="
  bg-primary-600 text-white
  px-6 py-3 rounded-xl font-medium
  hover:bg-primary-700
  active:scale-[0.98]
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  transition-all duration-150
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Add to Cart
</button>

<!-- Secondary -->
<button class="
  bg-white text-gray-900
  border border-gray-200
  px-6 py-3 rounded-xl font-medium
  hover:bg-gray-50 hover:border-gray-300
  active:scale-[0.98]
  transition-all duration-150
">
  Learn More
</button>

<!-- Ghost -->
<button class="
  text-primary-600
  px-4 py-2 rounded-lg font-medium
  hover:bg-primary-50
  transition-colors duration-150
">
  View All
</button>

<!-- Icon Button -->
<button class="
  p-2 rounded-full
  text-gray-500 hover:text-gray-700
  hover:bg-gray-100
  transition-colors
">
  <svg class="w-5 h-5">...</svg>
</button>
```

### Cards
```html
<!-- Product Card -->
<div class="
  bg-white rounded-2xl overflow-hidden
  shadow-soft hover:shadow-elevated
  transition-shadow duration-300
  group
">
  <div class="aspect-square overflow-hidden">
    <img
      src="..."
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div class="p-4">
    <p class="text-sm text-gray-500">Category</p>
    <h3 class="font-medium text-gray-900 mt-1">Product Name</h3>
    <p class="text-lg font-bold text-primary-600 mt-2">₹1,499</p>
  </div>
</div>

<!-- Feature Card -->
<div class="
  bg-gradient-to-br from-primary-50 to-white
  rounded-3xl p-8
  border border-primary-100
">
  <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
    <svg class="w-6 h-6 text-primary-600">...</svg>
  </div>
  <h3 class="text-xl font-semibold mt-6">Feature Title</h3>
  <p class="text-gray-600 mt-2">Feature description goes here.</p>
</div>

<!-- Glass Card -->
<div class="
  bg-white/80 backdrop-blur-lg
  rounded-2xl p-6
  border border-white/20
  shadow-lg
">
  Content
</div>
```

### Form Elements
```html
<!-- Input -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input
    type="email"
    class="
      w-full px-4 py-3 rounded-xl
      border border-gray-200
      focus:border-primary-500 focus:ring-2 focus:ring-primary-100
      outline-none transition-all duration-150
      placeholder:text-gray-400
    "
    placeholder="you@example.com"
  />
</div>

<!-- Input with Error -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">Password</label>
  <input
    type="password"
    class="
      w-full px-4 py-3 rounded-xl
      border border-red-300
      focus:border-red-500 focus:ring-2 focus:ring-red-100
      outline-none
    "
  />
  <p class="text-sm text-red-600">Password must be at least 8 characters</p>
</div>

<!-- Checkbox -->
<label class="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    class="
      w-5 h-5 rounded
      border-gray-300
      text-primary-600
      focus:ring-primary-500
    "
  />
  <span class="text-gray-700">Remember me</span>
</label>

<!-- Select -->
<select class="
  w-full px-4 py-3 rounded-xl
  border border-gray-200
  focus:border-primary-500 focus:ring-2 focus:ring-primary-100
  bg-white appearance-none
  bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg...%3E')]
  bg-no-repeat bg-[right_1rem_center]
">
  <option>Select option</option>
</select>
```

### Navigation
```html
<!-- Header -->
<header class="
  sticky top-0 z-50
  bg-white/80 backdrop-blur-lg
  border-b border-gray-100
">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="font-display font-bold text-xl">ZenSkin</a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="/products" class="text-gray-600 hover:text-gray-900">Products</a>
      <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
    </nav>

    <div class="flex items-center gap-4">
      <button class="relative p-2">
        <svg class="w-6 h-6">...</svg>
        <span class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Bottom Nav -->
<nav class="
  fixed bottom-0 inset-x-0 z-50
  bg-white border-t border-gray-100
  pb-[env(safe-area-inset-bottom)]
  md:hidden
">
  <div class="flex justify-around py-2">
    <a href="/" class="flex flex-col items-center py-2 px-4 text-primary-600">
      <svg class="w-6 h-6">...</svg>
      <span class="text-xs mt-1">Home</span>
    </a>
    <a href="/products" class="flex flex-col items-center py-2 px-4 text-gray-500">
      <svg class="w-6 h-6">...</svg>
      <span class="text-xs mt-1">Shop</span>
    </a>
  </div>
</nav>
```

## Utility Patterns

### Flexbox
```html
<!-- Center content -->
<div class="flex items-center justify-center">

<!-- Space between -->
<div class="flex items-center justify-between">

<!-- Stack with gap -->
<div class="flex flex-col gap-4">

<!-- Wrap items -->
<div class="flex flex-wrap gap-2">
```

### Grid
```html
<!-- Equal columns -->
<div class="grid grid-cols-3 gap-4">

<!-- Auto-fit responsive -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">

<!-- Asymmetric -->
<div class="grid grid-cols-[1fr_2fr] gap-4">
```

### Spacing
```html
<!-- Margin -->
<div class="mt-4 mb-8 mx-auto">

<!-- Padding -->
<div class="p-4 px-6 py-8">

<!-- Gap (in flex/grid) -->
<div class="flex gap-4">
<div class="grid gap-6">

<!-- Space between children -->
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Typography
```html
<!-- Headings -->
<h1 class="text-4xl font-bold text-gray-900">
<h2 class="text-2xl font-semibold text-gray-800">
<h3 class="text-xl font-medium text-gray-700">

<!-- Body text -->
<p class="text-base text-gray-600 leading-relaxed">

<!-- Small text -->
<span class="text-sm text-gray-500">
<span class="text-xs text-gray-400">

<!-- Truncate -->
<p class="truncate">Long text that gets cut off...</p>
<p class="line-clamp-2">Text clamped to 2 lines...</p>
```

## Animation Classes

```html
<!-- Built-in -->
<div class="animate-spin">Loading spinner</div>
<div class="animate-pulse">Skeleton loader</div>
<div class="animate-bounce">Bouncing element</div>

<!-- Transitions -->
<div class="transition-all duration-300 ease-out">
<div class="transition-colors duration-150">
<div class="transition-transform duration-200">

<!-- Hover/Active states -->
<button class="
  hover:bg-primary-700
  active:scale-[0.98]
  transition-all
">

<!-- Group hover -->
<div class="group">
  <img class="group-hover:scale-105 transition-transform" />
</div>
```

## Dark Mode

```html
<!-- Manual toggle -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

<!-- Automatic (system preference) -->
<!-- Configured in tailwind.config -->
<div class="bg-background text-foreground">
```

## Accessibility

```html
<!-- Focus visible -->
<button class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">

<!-- Screen reader only -->
<span class="sr-only">Close menu</span>

<!-- Reduced motion -->
<div class="motion-safe:animate-bounce motion-reduce:animate-none">
```
