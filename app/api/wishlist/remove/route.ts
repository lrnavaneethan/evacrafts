import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { wishlistId } = await req.json()
  if (!wishlistId) return NextResponse.json({ error: 'wishlistId is required' }, { status: 400 })

  await prisma.wishlist.deleteMany({
    where: { id: wishlistId, userId: user.id },
  })

  return NextResponse.json({ success: true })
}
