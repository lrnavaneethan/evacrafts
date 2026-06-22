import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export const maxDuration = 60

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
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

  const validFiles = files.filter((f) => f.size > 0)
  const uploadedImages: { url: string; publicId: string; sortOrder: number }[] = []
  try {
    for (let i = 0; i < validFiles.length; i++) {
      const result = await uploadToCloudinary(validFiles[i])
      uploadedImages.push({ ...result, sortOrder: i })
    }
  } catch {
    return NextResponse.json({ error: 'Image upload failed. Check your network or Cloudinary config.' }, { status: 502 })
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price: price ? parseFloat(price) : null,
      categoryId,
      isActive,
      images: {
        create: uploadedImages.map(({ url, publicId, sortOrder }) => ({
          imageUrl: url,
          publicId,
          sortOrder,
        })),
      },
    },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
  })

  return NextResponse.json(product, { status: 201 })
}
