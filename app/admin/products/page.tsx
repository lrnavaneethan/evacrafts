'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: string
  description: string
  featured: boolean
}

const initialProducts: Product[] = [
  { id: 1, name: 'Handmade Explosion Box', category: 'Surprise Gifts', price: '2499', description: 'A magical surprise box', featured: true },
  { id: 2, name: 'Personalized Scrapbook', category: 'Memory Gifts', price: '1999', description: 'Beautiful handcrafted scrapbook', featured: true },
  { id: 3, name: 'Couple Memory Frame', category: 'Romantic Gifts', price: '1799', description: 'Elegant frame for couples', featured: false },
  { id: 4, name: 'Wedding Memory Album', category: 'Wedding Gifts', price: '3499', description: 'Premium wedding album', featured: true },
]

const emptyForm = { name: '', category: '', price: '', description: '', featured: false }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    setForm({ name: product.name, category: product.category, price: product.price, description: product.description, featured: product.featured })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => setProducts(products.filter((p) => p.id !== id))

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (editingId !== null) {
      setProducts(products.map((p) => p.id === editingId ? { ...p, ...form } : p))
    } else {
      setProducts([...products, { ...form, id: Date.now() }])
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} products total</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-1" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-secondary">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3 text-primary font-semibold">₹{Number(product.price).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.featured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(product)} className="p-1.5 hover:bg-muted rounded transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-1.5 hover:bg-muted rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-border w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-secondary">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-secondary mb-1.5">Product Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="e.g. Handmade Explosion Box"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-secondary mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select category</option>
                    <option>Wedding Gifts</option>
                    <option>Birthday Gifts</option>
                    <option>Surprise Gifts</option>
                    <option>Romantic Gifts</option>
                    <option>Memory Gifts</option>
                    <option>Custom Gifts</option>
                    <option>Gift Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-secondary mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="2499"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-secondary mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Brief product description..."
                  />
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  <label htmlFor="featured" className="text-sm text-secondary">Show in Featured Products</label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-border">
              <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                {editingId ? 'Save Changes' : 'Add Product'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
