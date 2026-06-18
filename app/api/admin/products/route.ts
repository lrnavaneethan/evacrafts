import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const categoryId = formData.get('categoryId') as string
  const isActive = formData.get('isActive') === 'true'
  const files = formData.getAll('images') as File[]

  if (!name?.trim() || !categoryId) {
    return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
  }

  const uploadedImages = await Promise.all(
    files.filter((f) => f.size > 0).map((f, i) => uploadToCloudinary(f).then((r) => ({ ...r, sortOrder: i })))
  )

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price: price ? parseFloat(price) : null,
      categoryId,
      isActive,
      images: {
        create: uploadedImages.map(({ url, sortOrder }) => ({
          imageUrl: url,
          sortOrder,
        })),
      },
    },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
  })

  return NextResponse.json(product, { status: 201 })
}
