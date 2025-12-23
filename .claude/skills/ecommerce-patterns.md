# E-Commerce Patterns

Production patterns for building D2C e-commerce applications with Next.js and React Native.

## When to Use

Use this skill when:
- Building product catalogs and listings
- Implementing shopping cart functionality
- Creating checkout flows
- Integrating payment gateways (Razorpay)
- Managing orders and subscriptions

## Product Catalog

### Product Listing with Filters
```typescript
// app/(shop)/products/page.tsx
import { Suspense } from 'react'
import { ProductGrid, ProductGridSkeleton } from '@/components/products'
import { ProductFilters } from '@/components/products/ProductFilters'
import { createClient } from '@/lib/supabase/server'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
  }>
}) {
  const params = await searchParams

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <ProductFilters />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductList
              category={params.category}
              sort={params.sort}
              minPrice={params.minPrice ? Number(params.minPrice) : undefined}
              maxPrice={params.maxPrice ? Number(params.maxPrice) : undefined}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

async function ProductList({
  category,
  sort,
  minPrice,
  maxPrice,
}: {
  category?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)

  if (category) {
    query = query.eq('categories.slug', category)
  }

  if (minPrice !== undefined) {
    query = query.gte('price', minPrice)
  }

  if (maxPrice !== undefined) {
    query = query.lte('price', maxPrice)
  }

  switch (sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data: products, error } = await query

  if (error) throw error

  return <ProductGrid products={products} />
}
```

### Product Detail Page
```typescript
// app/(shop)/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductImages } from '@/components/products/ProductImages'
import { ProductInfo } from '@/components/products/ProductInfo'
import { AddToCartForm } from '@/components/products/AddToCartForm'
import { RelatedProducts } from '@/components/products/RelatedProducts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, description, images')
    .eq('slug', slug)
    .single()

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImages images={product.images} name={product.name} />

        <div className="space-y-8">
          <ProductInfo product={product} />
          <AddToCartForm product={product} />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts
          categoryId={product.category_id}
          excludeId={product.id}
        />
      </section>
    </main>
  )
}
```

## Shopping Cart

### Cart Store (Zustand)
```typescript
// stores/cart.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  salePrice?: number
  image: string
  quantity: number
  variant?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  subtotal: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variant === item.variant
          )

          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += 1
            return { items: newItems }
          }

          return {
            items: [
              ...state.items,
              { ...item, id: crypto.randomUUID(), quantity: 1 },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) }
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }
        }),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
          0
        ),

      itemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'zenskin-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : AsyncStorage
      ),
    }
  )
)
```

### Cart UI Component
```typescript
// components/cart/CartDrawer.tsx
'use client'

import { useCartStore } from '@/stores/cart'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { CartItem } from './CartItem'
import { formatPriceINR } from '@/lib/utils'
import Link from 'next/link'

export function CartDrawer() {
  const { items, isOpen, toggleCart, subtotal } = useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={toggleCart} asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPriceINR(subtotal())}</span>
              </div>
              <p className="text-sm text-gray-500">
                Shipping calculated at checkout
              </p>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={toggleCart}>
                  Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
```

## Checkout Flow

### Checkout Page
```typescript
// app/(shop)/checkout/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { OrderSummary } from '@/components/checkout/OrderSummary'

export default async function CheckoutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/checkout')
  }

  // Get user's saved addresses
  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm addresses={addresses ?? []} user={user} />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </main>
  )
}
```

### Checkout Form with Shipping
```typescript
// components/checkout/CheckoutForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCartStore } from '@/stores/cart'
import { createOrder, initiatePayment } from './actions'

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
})

type ShippingForm = z.infer<typeof shippingSchema>

export function CheckoutForm({ addresses, user }) {
  const [isLoading, setIsLoading] = useState(false)
  const { items, subtotal, clearCart } = useCartStore()

  const form = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: addresses[0] ?? {},
  })

  const handleSubmit = async (data: ShippingForm) => {
    setIsLoading(true)
    try {
      // Create order in database
      const order = await createOrder({
        userId: user.id,
        items,
        shippingAddress: data,
        total: subtotal(),
      })

      // Initiate Razorpay payment
      const paymentOptions = await initiatePayment({
        orderId: order.id,
        amount: subtotal(),
        customerEmail: user.email,
        customerPhone: data.phone,
      })

      // Open Razorpay checkout
      const razorpay = new window.Razorpay({
        ...paymentOptions,
        handler: async (response) => {
          // Verify payment on server
          await verifyPayment({
            orderId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          })

          clearCart()
          window.location.href = `/orders/${order.id}/confirmation`
        },
      })

      razorpay.open()
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Form fields */}
    </form>
  )
}
```

## Razorpay Integration

### Server-Side Payment Creation
```typescript
// app/(shop)/checkout/actions.ts
'use server'

import Razorpay from 'razorpay'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function createOrder({
  userId,
  items,
  shippingAddress,
  total,
}: {
  userId: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  total: number
}) {
  const supabase = await createClient()

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total: total,
      shipping_address: shippingAddress,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error

  // Create order items
  await supabase.from('order_items').insert(
    items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.salePrice ?? item.price,
    }))
  )

  return order
}

export async function initiatePayment({
  orderId,
  amount,
  customerEmail,
  customerPhone,
}: {
  orderId: string
  amount: number
  customerEmail: string
  customerPhone: string
}) {
  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100, // Razorpay expects paisa
    currency: 'INR',
    receipt: orderId,
    notes: {
      orderId,
    },
  })

  // Update order with Razorpay order ID
  const supabase = await createClient()
  await supabase
    .from('orders')
    .update({ razorpay_order_id: razorpayOrder.id })
    .eq('id', orderId)

  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    order_id: razorpayOrder.id,
    name: 'ZenSkin',
    description: `Order #${orderId.slice(0, 8)}`,
    prefill: {
      email: customerEmail,
      contact: customerPhone,
    },
    theme: {
      color: '#22c55e',
    },
  }
}

export async function verifyPayment({
  orderId,
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
}: {
  orderId: string
  razorpayPaymentId: string
  razorpayOrderId: string
  razorpaySignature: string
}) {
  // Verify signature
  const body = razorpayOrderId + '|' + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')

  if (expectedSignature !== razorpaySignature) {
    throw new Error('Invalid payment signature')
  }

  // Update order status
  const supabase = await createClient()
  await supabase
    .from('orders')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      payment_id: razorpayPaymentId,
    })
    .eq('id', orderId)

  return { success: true }
}
```

### Razorpay Webhook Handler
```typescript
// app/api/webhooks/razorpay/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('x-razorpay-signature')

  // Verify webhook signature
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

    case 'refund.processed':
      await handleRefundProcessed(event.payload.refund.entity)
      break
  }

  return NextResponse.json({ received: true })
}

async function handlePaymentCaptured(payment: any) {
  const orderId = payment.notes?.orderId

  if (!orderId) return

  await supabase
    .from('orders')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      payment_id: payment.id,
    })
    .eq('id', orderId)

  // Send confirmation email
  // await sendOrderConfirmationEmail(orderId)
}

async function handlePaymentFailed(payment: any) {
  const orderId = payment.notes?.orderId

  if (!orderId) return

  await supabase
    .from('orders')
    .update({
      payment_status: 'failed',
      payment_error: payment.error_description,
    })
    .eq('id', orderId)
}

async function handleRefundProcessed(refund: any) {
  const paymentId = refund.payment_id

  await supabase
    .from('orders')
    .update({
      status: 'refunded',
      refund_id: refund.id,
      refund_amount: refund.amount / 100,
    })
    .eq('payment_id', paymentId)
}
```

## Order Management

### Order History
```typescript
// app/(dashboard)/orders/page.tsx
import { createClient } from '@/lib/supabase/server'
import { OrderCard } from '@/components/orders/OrderCard'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        product:products(name, images)
      )
    `)
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Orders</h1>

      {orders?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No orders yet</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  )
}
```

### Order Status Badge
```typescript
// components/orders/OrderStatusBadge.tsx
const statusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800' },
  processing: { label: 'Processing', className: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Shipped', className: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
}

export function OrderStatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status]

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
```
