'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-beige-200 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Scandinavian Skincare</span>
            </div>

            <h1 className="mt-6 font-outfit text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Radiance from
              <span className="block text-gradient-amber">Nature&apos;s Best</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Discover the art of Scandinavian skincare. Our carefully crafted
              formulas combine pure Nordic ingredients with modern science for
              skin that glows with natural vitality.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="xl" variant="amber">
                Shop Collection
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline">
                Our Story
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Clean Ingredients</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">Vegan</p>
                <p className="text-xs text-muted-foreground">Cruelty-Free</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">Nordic</p>
                <p className="text-xs text-muted-foreground">Inspired</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-primary/30 to-amber-200/40 blur-2xl" />

              {/* Product Display */}
              <div className="relative z-10 animate-float">
                <div className="relative aspect-[3/4] w-80 overflow-hidden rounded-3xl bg-frost-300 p-8 shadow-elevated lg:w-96">
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    {/* Placeholder for product images */}
                    <div className="flex items-end gap-2">
                      {['Cleanser', 'Serum', 'Toner'].map((product, i) => (
                        <div
                          key={product}
                          className="flex flex-col items-center"
                          style={{ transform: `translateY(${i === 1 ? -20 : 0}px)` }}
                        >
                          <div
                            className="rounded-2xl bg-white shadow-lg"
                            style={{
                              width: i === 1 ? '80px' : '60px',
                              height: i === 1 ? '160px' : '120px'
                            }}
                          >
                            <div className="flex h-full flex-col items-center justify-end p-2">
                              <div className="mb-2 h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-primary" />
                              <span className="text-[8px] font-medium text-charcoal">{product}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center font-outfit text-lg font-semibold text-charcoal">
                      Complete Ritual Set
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
