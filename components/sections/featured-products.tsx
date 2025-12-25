'use client'

import { ProductCard, Product } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Gentle Glow Cleanser',
    slug: 'gentle-glow-cleanser',
    category: 'Cleanser',
    price: 1299,
    compareAtPrice: 1599,
    image: '/products/cleanser.jpg',
    description: 'A soothing gel cleanser that removes impurities while maintaining skin barrier.',
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Nordic Radiance Serum',
    slug: 'nordic-radiance-serum',
    category: 'Serum',
    price: 2499,
    image: '/products/serum.jpg',
    description: 'Concentrated vitamin C serum for brightening and evening skin tone.',
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Arctic Rose Toner',
    slug: 'arctic-rose-toner',
    category: 'Toner',
    price: 999,
    image: '/products/toner.jpg',
    description: 'Hydrating toner with wild Arctic rose extract for refreshed, balanced skin.',
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '4',
    name: 'Velvet Cloud Moisturizer',
    slug: 'velvet-cloud-moisturizer',
    category: 'Moisturizer',
    price: 1799,
    compareAtPrice: 2199,
    image: '/products/moisturizer.jpg',
    description: 'Lightweight yet deeply hydrating cream with Nordic cloudberry extract.',
    rating: 4.9,
    reviewCount: 201,
  },
]

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Our Bestsellers
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discover Your Perfect Ritual
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Each product in our collection is carefully formulated with pure Nordic
            ingredients to bring out your skin&apos;s natural radiance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
