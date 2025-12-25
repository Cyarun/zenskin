import { Leaf, Sparkles, Shield, Droplets } from 'lucide-react'

const benefits = [
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description:
      'Every formula uses only the purest, sustainably sourced Nordic botanicals.',
  },
  {
    icon: Sparkles,
    title: 'Visible Results',
    description:
      'Scientifically proven formulas that deliver noticeable improvement in 4 weeks.',
  },
  {
    icon: Shield,
    title: 'Dermatologist Tested',
    description:
      'All products are tested and approved by board-certified dermatologists.',
  },
  {
    icon: Droplets,
    title: 'Deep Hydration',
    description:
      'Advanced moisture-lock technology keeps your skin hydrated for 72 hours.',
  },
]

export function Benefits() {
  return (
    <section className="section-padding bg-frost-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Why SKON24
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Scandinavian Difference
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-soft transition-all hover:shadow-elevated"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="font-outfit text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
