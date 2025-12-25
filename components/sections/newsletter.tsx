'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="section-padding bg-gradient-to-br from-charcoal to-charcoal/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-amber-500/20 px-6 py-16 sm:px-12 sm:py-20">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-20">
            <div className="h-96 w-96 rounded-full bg-primary blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="font-outfit text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Glow Circle
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Subscribe for exclusive offers, skincare tips, and early access to new
              product launches. Get 15% off your first order.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-12 flex-1 rounded-lg border-0 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary sm:max-w-xs"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="amber"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    'Subscribing...'
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {status === 'success' && (
              <p className="mt-4 text-sm text-green-400">
                Welcome to the Glow Circle! Check your email for your discount code.
              </p>
            )}

            <p className="mt-4 text-xs text-white/50">
              By subscribing, you agree to our Privacy Policy and consent to receive
              updates from SKON24.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
