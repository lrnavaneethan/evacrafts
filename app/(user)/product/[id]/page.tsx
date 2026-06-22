'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Check } from 'lucide-react'

type ProductImage = {
  imageUrl: string
}

type Category = {
  id: string
  name: string
}

type Product = {
  id: string
  name: string
  description?: string | null
  price?: number | null
  category?: Category | null
  images?: ProductImage[]
}

const DEFAULT_FEATURES = [
  'Handcrafted with care',
  'Premium materials',
  'Perfect gift-ready presentation',
  'Made for everyday use',
]

const DEFAULT_SPECS = [
  'Size: Standard',
  'Material: High-quality fabric',
  'Color: Natural tones',
  'Care: Easy clean',
]

const DEFAULT_DELIVERY = 'Ships within 3-5 business days.'

export default function ProductPage() {
  const params = useParams<{id: string}>();
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/admin/products/${id}`);
        console.log('Fetch response:', res);
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          setError(body?.error || 'Failed to load product.')
          return
        }

        const data = await res.json()
        setProduct({
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price != null ? Number(data.price) : null,
          category: data.category,
          images: data.images,
        })
      } catch (err) {
        console.error('Product load error:', err)
        setError('Unable to load product details.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading product details...</div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4 py-8">
          <p className="text-xl font-semibold text-secondary mb-2">Product not found</p>
          <p className="text-sm text-muted-foreground">{error || 'No product details are available.'}</p>
        </div>
      </main>
    )
  }

  const productImages = product.images?.length ? product.images : [{imageUrl: '/placeholder.png'}]
  const productImage = productImages[selectedImageIndex]?.imageUrl || '/placeholder.png'
  const categoryName = product.category?.name || 'Uncategorized'
  const priceLabel = product.price != null ? `₹${product.price.toFixed(2)}` : 'Contact for price'
  const features = DEFAULT_FEATURES
  const specs = DEFAULT_SPECS
  const delivery = DEFAULT_DELIVERY

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex gap-4">
              {/* Left Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === index ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image on Right */}
              <div className="flex-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                <img src={productImage} alt={product.name} className="object-cover w-full h-full" />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-primary font-semibold uppercase tracking-wide mb-2">{categoryName}</p>
                <h1 className="text-4xl font-bold text-secondary mb-4">{product.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9 (27 reviews)</span>
                </div>

                <p className="text-3xl font-bold text-primary">{priceLabel}</p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description ?? 'No description available.'}</p>
                <p className="text-muted-foreground leading-relaxed">{product.description ? 'More product details are shown below.' : 'Please contact us for more information.'}</p>
              </div>

              {/* Features */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-secondary mb-3">Why you&apos;ll love this</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
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
                  {specs.map((spec, index) => (
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
                <p className="text-sm text-muted-foreground">{delivery}</p>
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
                  <button
                    onClick={() => {}}
                    className="px-3 py-1 bg-muted hover:bg-border rounded border border-border flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </button>
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
