import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Cleanser', href: '/shop/cleanser' },
    { name: 'Serum', href: '/shop/serum' },
    { name: 'Toner', href: '/shop/toner' },
    { name: 'Moisturizer', href: '/shop/moisturizer' },
    { name: 'Sunscreen', href: '/shop/sunscreen' },
  ],
  company: [
    { name: 'Our Story', href: '/story' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Track Order', href: '/track' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
  ],
}

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/skon24', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/skon24', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/skon24', icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.svg"
              alt="SKON24"
              width={140}
              height={46}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Scandinavian-inspired skincare crafted for your wellness journey.
              Pure ingredients, radiant results.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} SKON24. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-white/50 transition-colors hover:text-white/70"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
