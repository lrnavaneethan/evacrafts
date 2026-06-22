import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export const maxDuration = 60

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await Promise.allSettled(
    product.images
      .filter((img) => img.publicId)
      .map((img) => deleteFromCloudinary(img.publicId!))
  )

  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formData = await req.formData()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const categoryId = formData.get('categoryId') as string
  const isActive = formData.get('isActive') === 'true'
  const existingImageIds = formData.getAll('existingImageIds').map((value) => value.toString())
  const files = formData.getAll('images') as File[]

  if (!name?.trim() || !categoryId) {
    return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  })

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const removedImages = product.images.filter((img) => !existingImageIds.includes(img.id))
  await Promise.allSettled(
    removedImages
      .filter((img) => img.publicId)
      .map((img) => deleteFromCloudinary(img.publicId!))
  )

  const uploadedImages: { url: string; publicId: string; sortOrder: number }[] = []
  const validFiles = files.filter((f) => f.size > 0)
  try {
    for (let i = 0; i < validFiles.length; i++) {
      const result = await uploadToCloudinary(validFiles[i])
      uploadedImages.push({ ...result, sortOrder: product.images.length + i })
    }
  } catch {
    return NextResponse.json({ error: 'Image upload failed. Check your network or Cloudinary config.' }, { status: 502 })
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price: price ? parseFloat(price) : null,
      categoryId,
      isActive,
      images: {
        deleteMany: product.images
          .filter((img) => !existingImageIds.includes(img.id))
          .map((img) => ({ id: img.id })),
        create: uploadedImages.map(({ url, publicId, sortOrder }) => ({
          imageUrl: url,
          publicId,
          sortOrder,
        })),
      },
    },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
  })

  return NextResponse.json(updatedProduct)
}
