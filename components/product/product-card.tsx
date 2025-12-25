'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  compareAtPrice?: number
  image: string
  description: string
  rating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false)

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null

  return (
    <Card className={cn('group product-card overflow-hidden', className)}>
      <div className="relative aspect-square overflow-hidden bg-frost-300">
        {/* Product Image */}
        <div className="flex h-full items-center justify-center p-6">
          {/* Placeholder product visualization */}
          <div className="relative flex h-full w-full items-end justify-center pb-4">
            <div className="h-4/5 w-1/2 rounded-2xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full flex-col items-center justify-end p-4">
                <div className="mb-4 h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-primary" />
                <span className="text-xs font-medium text-charcoal">{product.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'
            )}
          />
        </button>

        {/* Quick Add */}
        <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button className="w-full" size="sm">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {product.category}
          </p>
          <h3 className="mt-1 font-outfit text-lg font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < Math.floor(product.rating!)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
