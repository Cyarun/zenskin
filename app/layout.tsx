import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SKON24 | Scandinavian Skincare - Valmående',
  description: 'Premium Scandinavian-inspired skincare for radiant, healthy skin. Cleanser, Serum, Toner, Moisturizer & Sunscreen crafted for your wellness journey.',
  keywords: ['skincare', 'scandinavian', 'wellness', 'cleanser', 'serum', 'toner', 'moisturizer', 'sunscreen', 'SKON24'],
  authors: [{ name: 'SKON24' }],
  openGraph: {
    title: 'SKON24 | Scandinavian Skincare',
    description: 'Premium Scandinavian-inspired skincare for radiant, healthy skin.',
    siteName: 'SKON24',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
