'use client'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviews,
  inStock,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSavingFavorite, setIsSavingFavorite] = useState(false)
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSavingFavorite || isFavorite) return

    setIsSavingFavorite(true)
    try {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id }),
      })

      if (res.status === 401) {
        window.location.href = '/api/auth/google/login'
        return
      }

      if (!res.ok) {
        console.error('Failed to add product to wishlist', await res.text())
        return
      }

      setIsFavorite(true)
    } catch (error) {
      console.error('Error adding product to wishlist', error)
    } finally {
      setIsSavingFavorite(false)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: call your add-to-cart logic here
  }

  return (
    <Link href={`/product/${id}`}>
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          onError={(event) => {
            const img = event.currentTarget as HTMLImageElement
            img.src = '/placeholder.png'
          }}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badge Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="inline-flex w-fit rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 transition-all duration-200 hover:bg-white hover:scale-110 dark:bg-card/90"
          aria-label="Add to favorites"
          >
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              isFavorite
              ? 'fill-destructive stroke-destructive'
              : 'stroke-foreground'
            }`}
            />
        </button>

      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </p>

        <h3 className="mt-2 line-clamp-2 font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
              key={i}
              className={`text-sm ${
                i < Math.floor(rating)
                ? 'text-yellow-400'
                : 'text-muted-foreground'
              }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex flex-col gap-3 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full"
            disabled={!inStock}
            aria-label="Add to cart"
            onClick={handleAddToCart}
            >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
            </Link>
  )
}