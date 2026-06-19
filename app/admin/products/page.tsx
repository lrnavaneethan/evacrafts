'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, X, ImagePlus, Loader2, Edit } from 'lucide-react'

type Category = { id: string; name: string }
type ProductImage = { id: string; imageUrl: string; sortOrder: number }
type Product = {
  id: string
  name: string
  description: string | null
  price: string | null
  isActive: boolean
  category: Category
  categoryId: string
  images: ProductImage[]
}

const emptyForm = { name: '', description: '', price: '', categoryId: '', isActive: true }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [existingImages, setExistingImages] = useState<ProductImage[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      setLoading(false)
    })
  }, [])

  function openAdd() {
    setForm(emptyForm)
    setEditingProduct(null)
    setExistingImages([])
    setImageFiles([])
    setImagePreviews([])
    setError('')
    setShowForm(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: product.price ?? '',
      categoryId: product.categoryId,
      isActive: product.isActive,
    })
    setExistingImages(product.images)
    setImageFiles([])
    setImagePreviews([])
    setError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingProduct(null)
    imagePreviews.forEach((p) => URL.revokeObjectURL(p))
    setImagePreviews([])
    setImageFiles([])
    setExistingImages([])
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setImageFiles((prev) => [...prev, ...files])
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))])
    e.target.value = ''
  }

  function removeExistingImage(id: string) {
    setExistingImages((prev) => prev.filter((image) => image.id !== id))
  }

  function removePreview(index: number) {
    URL.revokeObjectURL(imagePreviews[index])
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!form.name?.trim() || !form.categoryId) { setError('Name and category are required'); return }
    setSaving(true); setError('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('description', form.description || '')
      fd.append('price', form.price || '')
      fd.append('categoryId', form.categoryId)
      fd.append('isActive', String(form.isActive))
      existingImages.forEach((img) => fd.append('existingImageIds', img.id))
      imageFiles.forEach((f) => fd.append('images', f))

      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products'
      const method = editingProduct ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, body: fd })
      if (!res.ok) throw new Error(await res.text())
      const product: Product = await res.json()

      setProducts((prev) =>
        editingProduct
          ? prev.map((item) => (item.id === product.id ? product : item))
          : [product, ...prev]
      )
      closeForm()
    } catch (e: any) {
      setError(e.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} products total</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-1" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12 text-sm">No products yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Image</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Price</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-muted" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-secondary">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category.name}</td>
                  <td className="px-4 py-3 text-primary font-semibold">{p.price ? `₹${Number(p.price).toLocaleString()}` : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {p.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-muted rounded transition-colors" title="Edit product">
                        <Edit className="w-3.5 h-3.5 text-primary" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-muted rounded transition-colors" title="Delete product">
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-border w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white">
              <h2 className="font-semibold text-secondary">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={closeForm} className="p-1 hover:bg-muted rounded"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 space-y-4">
              {error && <p className="text-sm text-destructive bg-destructive/5 px-3 py-2 rounded-lg">{error}</p>}

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Product Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Handmade Explosion Box" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-secondary mb-1.5">Category *</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary mb-1.5">Price (₹)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="2499" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Brief product description..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Images</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {existingImages.map((image) => (
                    <div key={image.id} className="relative w-20 h-20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.imageUrl} alt="Existing image" className="w-20 h-20 rounded-lg object-cover border border-border" />
                      <button onClick={() => removeExistingImage(image.id)}
                        className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {imagePreviews.map((src, i) => (
                    <div key={`new-${i}`} className="relative w-20 h-20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="New preview" className="w-20 h-20 rounded-lg object-cover border border-border" />
                      <button onClick={() => removePreview(i)}
                        className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-xs">Add</span>
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded border-border" />
                <label htmlFor="isActive" className="text-sm text-secondary">Active (visible on site)</label>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-border sticky bottom-0 bg-white">
              <Button onClick={handleSave} disabled={saving} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
              <Button variant="outline" onClick={closeForm} disabled={saving} className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
