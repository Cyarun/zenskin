# shadcn/ui & Theming Skill

Comprehensive toolkit for building beautiful, accessible UI components with shadcn/ui and custom themes.

## When to Use

Use this skill when:
- Building UI components with shadcn/ui
- Implementing dark/light mode theming
- Creating custom color schemes (e.g., ZenSkin brand)
- Using tweakcn for theme customization
- Building accessible, consistent interfaces
- Working with React Native components (via react-native-reusables)

## MCP Server Available

The shadcn-ui MCP server provides:
- Component scaffolding and generation
- Theme configuration assistance
- Multi-framework support (React, React Native, Vue, Svelte)
- Component documentation lookup

## shadcn/ui Overview

shadcn/ui is NOT a component library - it's a collection of re-usable components you copy into your project. Benefits:
- Full ownership of component code
- Customize everything
- No runtime dependencies
- Built on Radix UI primitives
- Tailwind CSS styling

## Installation

### Next.js Setup

```bash
# Initialize shadcn/ui in Next.js project
npx shadcn@latest init

# Configuration prompts:
# - Style: Default or New York
# - Base color: Slate, Gray, Zinc, Neutral, Stone
# - CSS variables: Yes (recommended)
# - tailwind.config location
# - components.json location
```

### Add Components

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog

# Add multiple at once
npx shadcn@latest add button card input form

# Add all components
npx shadcn@latest add --all
```

## Essential Components for E-commerce

### Core UI Components

```bash
# Navigation & Layout
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet        # Mobile sidebar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add breadcrumb

# Forms & Input
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add textarea

# Feedback
npx shadcn@latest add toast
npx shadcn@latest add alert
npx shadcn@latest add skeleton
npx shadcn@latest add progress

# Data Display
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add avatar

# Overlay
npx shadcn@latest add dialog
npx shadcn@latest add drawer
npx shadcn@latest add popover
npx shadcn@latest add tooltip
```

## Theming System

### CSS Variables Structure

shadcn/ui uses CSS variables for theming in `globals.css`:

```css
@layer base {
  :root {
    /* ZenSkin Light Theme */
    --background: 60 9% 98%;       /* Warm off-white */
    --foreground: 20 14% 15%;      /* Rich dark brown */

    --card: 0 0% 100%;
    --card-foreground: 20 14% 15%;

    --popover: 0 0% 100%;
    --popover-foreground: 20 14% 15%;

    /* Primary - Sage Green (Brand) */
    --primary: 150 30% 45%;
    --primary-foreground: 0 0% 100%;

    /* Secondary - Warm Terracotta */
    --secondary: 15 50% 60%;
    --secondary-foreground: 0 0% 100%;

    /* Accent - Soft Gold */
    --accent: 45 70% 55%;
    --accent-foreground: 20 14% 15%;

    /* Muted - Soft backgrounds */
    --muted: 60 5% 92%;
    --muted-foreground: 20 10% 40%;

    /* Destructive - Error states */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    /* Border & Input */
    --border: 20 10% 85%;
    --input: 20 10% 85%;
    --ring: 150 30% 45%;

    /* Radius */
    --radius: 0.75rem;
  }

  .dark {
    /* ZenSkin Dark Theme */
    --background: 20 14% 10%;
    --foreground: 60 9% 95%;

    --card: 20 14% 12%;
    --card-foreground: 60 9% 95%;

    --popover: 20 14% 12%;
    --popover-foreground: 60 9% 95%;

    --primary: 150 35% 50%;
    --primary-foreground: 20 14% 10%;

    --secondary: 15 45% 55%;
    --secondary-foreground: 0 0% 100%;

    --accent: 45 65% 50%;
    --accent-foreground: 20 14% 10%;

    --muted: 20 14% 18%;
    --muted-foreground: 60 5% 65%;

    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 20 14% 20%;
    --input: 20 14% 20%;
    --ring: 150 35% 50%;
  }
}
```

### Theme Provider Setup

```tsx
// components/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Toggle Component

```tsx
// components/theme-toggle.tsx
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## tweakcn Integration

tweakcn is a visual theme editor for shadcn/ui themes.

### Using tweakcn

1. Visit https://tweakcn.com
2. Customize colors visually
3. Export CSS variables
4. Paste into your `globals.css`

### Custom Theme from tweakcn

```css
/* Example: ZenSkin wellness theme generated with tweakcn */
@layer base {
  :root {
    /* Copy exported variables from tweakcn here */
    --background: 60 9% 98%;
    --foreground: 20 14% 15%;
    /* ... rest of variables */
  }
}
```

## Component Patterns

### Product Card

```tsx
// components/product-card.tsx
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  category,
  inStock
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{category}</p>
        <h3 className="font-semibold line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">₹{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!inStock}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Navigation Header

```tsx
// components/header.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              <Link href="/products">All Products</Link>
              <Link href="/category/gut-health">Gut Health</Link>
              <Link href="/category/skin-care">Skin Care</Link>
              <Link href="/about">About</Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          ZenSkin
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 ml-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
          <Link href="/category/gut-health" className="text-sm font-medium hover:text-primary">
            Gut Health
          </Link>
          <Link href="/category/skin-care" className="text-sm font-medium hover:text-primary">
            Skin Care
          </Link>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
```

### Form with Validation

```tsx
// components/checkout-form.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  address: z.string().min(10, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid PIN code'),
})

export function CheckoutForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="House no, Street, Landmark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    {/* Add more states */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <Input placeholder="400001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue to Payment
        </Button>
      </form>
    </Form>
  )
}
```

## React Native (react-native-reusables)

For React Native apps, use react-native-reusables which provides shadcn/ui-style components:

### Installation

```bash
# Install react-native-reusables
npx @react-native-reusables/cli init

# Add components
npx @react-native-reusables/cli add button
npx @react-native-reusables/cli add card
npx @react-native-reusables/cli add input
```

### Usage in Expo

```tsx
// app/(tabs)/index.tsx
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to ZenSkin</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>Your gut-to-skin wellness journey starts here.</Text>
          <Button className="mt-4">
            <Text>Shop Now</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  )
}
```

## Best Practices

1. **Always use semantic colors** - Use `primary`, `secondary`, `muted` instead of raw colors
2. **Leverage CSS variables** - All colors should go through CSS variables for easy theming
3. **Test both themes** - Always verify components in light and dark mode
4. **Keep accessibility in mind** - Ensure contrast ratios meet WCAG standards
5. **Use Tailwind classes** - Avoid inline styles, use Tailwind utilities
6. **Copy components locally** - shadcn/ui is meant to be copied, not imported from a package

## Useful Commands

```bash
# List available components
npx shadcn@latest add --help

# Update components
npx shadcn@latest diff button

# Add with custom path
npx shadcn@latest add button --path src/components/ui
```

## Resources

- shadcn/ui Docs: https://ui.shadcn.com
- tweakcn Theme Editor: https://tweakcn.com
- react-native-reusables: https://rnr-docs.vercel.app
- Radix UI Primitives: https://radix-ui.com
