'use client'

import { useState } from 'react'
import { Upload, X, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploaderProps {
  onImageUpload: (url: string) => void
  imageUrl?: string
}

export function ImageUploader({ onImageUpload, imageUrl }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(imageUrl || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError(null)
    setLoading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary via API
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onImageUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-8">
        {preview ? (
          <div className="relative w-full h-64">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
              onError={() => setPreview(imageUrl || null)}
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer">
            {loading ? (
              <Loader className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm text-foreground font-medium">
                  Click to upload image
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 5MB
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={loading}
              className="hidden"
            />
          </label>
        )}
      </div>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
