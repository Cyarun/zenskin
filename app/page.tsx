import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { Benefits } from '@/components/sections/benefits'
import { Newsletter } from '@/components/sections/newsletter'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <Benefits />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
