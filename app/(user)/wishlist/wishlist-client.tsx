'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Heart } from 'lucide-react'

interface WishlistItem {
  id: string
  productId: string
  name: string
  description: string
  price: string | null
  image: string | null
  addedAt: string
}

export function WishlistClient({ initialItems }: { initialItems: WishlistItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [removing, setRemoving] = useState<string | null>(null)

  async function handleRemove(wishlistId: string) {
    setRemoving(wishlistId)
    try {
      const res = await fetch('/api/wishlist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlistId }),
      })
      if (res.ok) setItems((prev) => prev.filter((i) => i.id !== wishlistId))
    } finally {
      setRemoving(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24 space-y-4">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto" />
        <p className="text-muted-foreground">Your wishlist is empty.</p>
        <Link href="/product" className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            )}
          </div>

          <div className="p-4 space-y-3">
            <Link href={`/product/${item.productId}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            {item.price && <p className="text-lg font-bold text-primary">₹{item.price}</p>}
            <p className="text-xs text-muted-foreground">
              Added {new Date(item.addedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>

            <Button
              size="sm"
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => handleRemove(item.id)}
              disabled={removing === item.id}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {removing === item.id ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
