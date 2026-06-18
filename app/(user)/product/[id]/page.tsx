'use client'

import { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Check } from 'lucide-react'

const products: Record<string, any> = {
  '1': {
    name: 'Handmade Explosion Box',
    category: 'Surprise Gifts',
    price: '₹2,499',
    rating: 4.8,
    reviews: 124,
    description: 'A magical surprise box that unfolds like petals with photos and memories. Perfect for birthdays, anniversaries, and special occasions.',
    longDescription: 'This handcrafted explosion box is designed to create unforgettable moments. Each panel is carefully assembled with premium cardstock and decorated with beautiful embellishments. Inside, you can customize with photos, messages, and memories. The box opens in a magical sequence, revealing 8 individual gift compartments.',
    specs: [
      'Dimensions: 6" x 6" x 6"',
      'Material: Premium Cardstock',
      'Customizable with photos',
      'Includes 8 gift compartments',
      'Free personalization',
    ],
    delivery: '7-14 business days',
    features: ['Handmade', 'Customizable', 'Premium Materials', 'Eco-Friendly Packaging'],
  },
}

export default function ProductPage({ params }: 
  { params:Promise< { id: string }> }) {
    const {id} = use(params)
  const product = products[id] || products['1']
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-96 md:h-full min-h-96 flex items-center justify-center sticky top-20">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">{product.name}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-primary font-semibold uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-secondary mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-3xl font-bold text-primary">{product.price}</p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
              </div>

              {/* Features */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-secondary mb-3">Why you&apos;ll love this</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary">Specifications</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec: string, index: number) => (
                    <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-primary">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Info */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-sm font-semibold text-secondary mb-1">Delivery Time</p>
                <p className="text-sm text-muted-foreground">{product.delivery}</p>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-4 bg-muted rounded-lg p-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-border rounded"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-border rounded"
                    >
                      +
                    </button>
                  </div>
                  <Button size="lg" variant="outline" className="flex-1 border-border">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added to Inquiry
                    </>
                  ) : (
                    'Add to Inquiry'
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button size="sm" variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                    Order via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-secondary mb-8">Related Products</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-white rounded-lg border border-border p-4">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-48 rounded-lg mb-4" />
                  <h3 className="font-semibold text-secondary mb-2">Related Gift Option</h3>
                  <p className="text-sm text-muted-foreground mb-3">Premium handmade gift option</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">₹1,999</span>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
