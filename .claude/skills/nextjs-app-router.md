# Next.js App Router

Production Next.js 15 with App Router, Server Components, and modern patterns.

## When to Use

Use this skill when:
- Building Next.js applications
- Implementing App Router patterns
- Working with Server Components
- Data fetching and caching
- Optimizing performance

## Project Structure

```
apps/web/
├── app/
│   ├── (marketing)/          # Marketing pages group
│   │   ├── page.tsx          # Home page
│   │   ├── about/
│   │   └── contact/
│   ├── (shop)/               # E-commerce group
│   │   ├── products/
│   │   │   ├── page.tsx      # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Product detail
│   │   ├── cart/
│   │   └── checkout/
│   ├── (auth)/               # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Protected pages
│   │   ├── layout.tsx        # Auth check
│   │   ├── orders/
│   │   └── profile/
│   ├── api/                  # API routes
│   │   ├── trpc/[trpc]/
│   │   └── webhooks/
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── forms/
│   └── layout/
├── lib/
│   ├── supabase/
│   ├── api.ts
│   └── utils.ts
└── middleware.ts
```

## Layouts

### Root Layout
```typescript
// app/layout.tsx
import { Inter, DM_Sans } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-display' })

export const metadata = {
  title: {
    default: 'ZenSkin - Radiant Skin Starts Within',
    template: '%s | ZenSkin',
  },
  description: 'Gut-to-skin wellness supplements and personalized skincare routines',
  metadataBase: new URL('https://zenskin.in'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Group Layout with Auth
```typescript
// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
```

## Server Components

### Data Fetching
```typescript
// app/(shop)/products/page.tsx
import { Suspense } from 'react'
import { ProductGrid, ProductGridSkeleton } from '@/components/products'
import { api } from '@/lib/api'

// This page uses ISR with 60 second revalidation
export const revalidate = 60

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductList category={params.category} sort={params.sort} />
      </Suspense>
    </main>
  )
}

async function ProductList({
  category,
  sort,
}: {
  category?: string
  sort?: string
}) {
  const products = await api.product.list({ category, sort })

  return <ProductGrid products={products} />
}
```

### Product Detail with generateStaticParams
```typescript
// app/(shop)/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'
import { ProductDetails } from '@/components/products/ProductDetails'

export async function generateStaticParams() {
  const products = await api.product.listSlugs()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await api.product.getBySlug(slug)

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await api.product.getBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}
```

## Server Actions

```typescript
// app/(shop)/cart/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1).max(10),
})

export async function addToCart(formData: FormData) {
  const result = addToCartSchema.safeParse({
    productId: formData.get('productId'),
    quantity: Number(formData.get('quantity') ?? 1),
  })

  if (!result.success) {
    return { error: 'Invalid input' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Store in cookie for anonymous users
    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '[]')
    cart.push(result.data)
    cookieStore.set('cart', JSON.stringify(cart))
  } else {
    // Store in database for authenticated users
    await supabase.from('cart_items').upsert({
      user_id: user.id,
      product_id: result.data.productId,
      quantity: result.data.quantity,
    })
  }

  revalidatePath('/cart')
  return { success: true }
}
```

## Client Components

```typescript
// components/products/AddToCartButton.tsx
'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/app/(shop)/cart/actions'
import { Button } from '@/components/ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addToCart(formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Added to cart!')
        router.refresh()
      }
    })
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="mr-2 h-4 w-4" />
        )}
        Add to Cart
      </Button>
    </form>
  )
}
```

## Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users from auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## API Routes

### tRPC Handler
```typescript
// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@zenskin/api'
import { createContext } from '@zenskin/api/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }
```

### Webhook Handler
```typescript
// app/api/webhooks/razorpay/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('x-razorpay-signature')

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  switch (event.event) {
    case 'payment.captured':
      await handlePaymentCaptured(event.payload.payment.entity)
      break
    case 'payment.failed':
      await handlePaymentFailed(event.payload.payment.entity)
      break
  }

  return NextResponse.json({ received: true })
}
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      />
    </div>
  )
}
```

### Streaming with Suspense
```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      {/* Critical content loads immediately */}
      <Hero />

      {/* Non-critical content streams in */}
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <CustomerReviews />
      </Suspense>
    </main>
  )
}
```

### Parallel Data Fetching
```typescript
export default async function Page() {
  // Fetch in parallel
  const [products, categories, reviews] = await Promise.all([
    api.product.list(),
    api.category.list(),
    api.review.recent(),
  ])

  return (
    <main>
      <Categories categories={categories} />
      <ProductGrid products={products} />
      <Reviews reviews={reviews} />
    </main>
  )
}
```

## Error Handling

```typescript
// app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
```

```typescript
// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find the requested page.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
```
