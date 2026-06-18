import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { WishlistClient } from './wishlist-client'
import Link from 'next/link'

export default async function WishlistPage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Please sign in to view your wishlist.</p>
          <Link href="/api/auth/google/login" className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm">
            Sign In
          </Link>
        </div>
      </main>
    )
  }

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const items = wishlist.map((w) => ({
    id: w.id,
    productId: w.product.id,
    name: w.product.name,
    description: w.product.description ?? '',
    price: w.product.price ? w.product.price.toString() : null,
    image: w.product.images[0]?.imageUrl ?? null,
    addedAt: w.createdAt.toISOString(),
  }))

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary mb-8">My Wishlist</h1>
        <WishlistClient initialItems={items} />
      </div>
    </main>
  )
}
