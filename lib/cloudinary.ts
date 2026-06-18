export async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  const dataURI = `data:${file.type};base64,${base64}`

  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'evacrafts/products'

  const str = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const signature = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const form = new FormData()
  form.append('file', dataURI)
  form.append('api_key', process.env.CLOUDINARY_API_KEY!)
  form.append('timestamp', String(timestamp))
  form.append('folder', folder)
  form.append('signature', signature)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: form }
  )

  if (!res.ok) throw new Error('Cloudinary upload failed')
  const json = await res.json()
  return { url: json.secure_url, publicId: json.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const timestamp = Math.floor(Date.now() / 1000)
  const str = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
  const encoder = new TextEncoder()
  const hashBuffer = await crypto.subtle.digest('SHA-1', encoder.encode(str))
  const signature = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const form = new FormData()
  form.append('public_id', publicId)
  form.append('api_key', process.env.CLOUDINARY_API_KEY!)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)

  await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    { method: 'POST', body: form }
  )
}
