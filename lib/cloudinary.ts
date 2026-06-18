import crypto from 'crypto'

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

function sign(params: Record<string, string>): string {
  const str =
    Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&') + API_SECRET
  return crypto.createHash('sha256').update(str).digest('hex')
}

export async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  const timestamp = String(Math.floor(Date.now() / 1000))
  const folder = 'evacrafts/products'
  const signature = sign({ folder, timestamp })

  const form = new FormData()
  form.append('file', new Blob([await file.arrayBuffer()], { type: file.type }), file.name)
  form.append('api_key', API_KEY)
  form.append('timestamp', timestamp)
  form.append('folder', folder)
  form.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Cloudinary upload failed: ${err}`)
  }

  const data = await res.json()
  return { url: data.secure_url, publicId: data.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const timestamp = String(Math.floor(Date.now() / 1000))
  const signature = sign({ public_id: publicId, timestamp })

  const form = new FormData()
  form.append('public_id', publicId)
  form.append('api_key', API_KEY)
  form.append('timestamp', timestamp)
  form.append('signature', signature)

  await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/destroy`, {
    method: 'POST',
    body: form,
  })
}
