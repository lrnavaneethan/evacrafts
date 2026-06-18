import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await Promise.allSettled(
    product.images
      .filter((img) => (img as any).publicId)
      .map((img) => deleteFromCloudinary((img as any).publicId))
  )

  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
