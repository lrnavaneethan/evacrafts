import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted via-background to-background pt-12 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-20">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Handmade Gifts Crafted with Love
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Discover meaningful, personalized gifts created by a passionate artist. Every piece is handcrafted with premium materials and attention to detail, designed to bring joy and lasting memories.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                  Explore Collection
                </Button>
              </Link>
              <Link href="#custom">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                  Custom Order
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1000+</div>
                <p className="text-sm text-muted-foreground">Gifts Created</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden flex items-center justify-center min-h-96 md:min-h-96">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Premium Handmade Gifts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
