'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Handmade Explosion Box',
    category: 'Surprise Gifts',
    price: '₹2,499',
    description: 'A magical surprise box that unfolds like petals with photos and memories',
  },
  {
    id: 2,
    name: 'Personalized Scrapbook',
    category: 'Memory Gifts',
    price: '₹1,999',
    description: 'Beautiful handcrafted scrapbook filled with memories and personal touches',
  },
  {
    id: 3,
    name: 'Couple Memory Frame',
    category: 'Romantic Gifts',
    price: '₹1,799',
    description: 'Elegant frame designed to hold your most precious couple moments',
  },
  {
    id: 4,
    name: 'Wedding Memory Album',
    category: 'Wedding Gifts',
    price: '₹3,499',
    description: 'Premium album to preserve your wedding memories for a lifetime',
  },
  {
    id: 5,
    name: 'Customized Gift Hamper',
    category: 'Custom Gifts',
    price: '₹2,799',
    description: 'Personalized hamper filled with curated handmade and premium items',
  },
  {
    id: 6,
    name: 'Handmade Greeting Box',
    category: 'Gift Box',
    price: '₹899',
    description: 'Beautiful greeting box perfect for any occasion with custom message',
  },
  {
    id: 7,
    name: 'Photo Memory Jar',
    category: 'Memory Gifts',
    price: '₹1,299',
    description: 'Glass jar filled with handwritten memories and photos of special moments',
  },
  {
    id: 8,
    name: 'Surprise Gift Basket',
    category: 'Surprise Gifts',
    price: '₹2,199',
    description: 'Beautifully arranged basket with handmade and curated surprise items',
  },
]

export function FeaturedProducts() {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular handmade creations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image */}
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-48 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 relative">
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors">
                  <Heart className="w-4 h-4 text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-lg font-semibold text-secondary mt-1">{product.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <span className="text-xs text-muted-foreground">Free Delivery</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="flex-1 text-xs w-full">
                      View Details
                    </Button>
                  </Link>
                  <Link href="/inquiry" className="flex-1">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white w-full">
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#products">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
