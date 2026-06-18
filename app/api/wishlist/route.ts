import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: { product: { include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ success: true, data: wishlist })
}
