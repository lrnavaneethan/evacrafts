'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

type Collection = {
  id: number
  name: string
  description: string
  productCount: number
  visible: boolean
}

const initialCollections: Collection[] = [
  { id: 1, name: 'Wedding Gifts', description: 'Celebrate love with beautiful personalized wedding memories', productCount: 4, visible: true },
  { id: 2, name: 'Birthday Gifts', description: 'Make birthdays special with unique handcrafted presents', productCount: 6, visible: true },
  { id: 3, name: 'Anniversary Gifts', description: 'Honor milestones with meaningful gift creations', productCount: 3, visible: true },
  { id: 4, name: 'Surprise Gifts', description: 'Delight loved ones with unexpected special gifts', productCount: 5, visible: false },
  { id: 5, name: 'Romantic Gifts', description: 'Express love and affection through thoughtful presents', productCount: 4, visible: true },
  { id: 6, name: 'Corporate Gifts', description: 'Strengthen business relationships with premium gifts', productCount: 2, visible: true },
]

const emptyForm = { name: '', description: '', productCount: 0, visible: true }

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (col: Collection) => {
    setForm({ name: col.name, description: col.description, productCount: col.productCount, visible: col.visible })
    setEditingId(col.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => setCollections(collections.filter((c) => c.id !== id))

  const handleSave = () => {
    if (!form.name) return
    if (editingId !== null) {
      setCollections(collections.map((c) => c.id === editingId ? { ...c, ...form } : c))
    } else {
      setCollections([...collections, { ...form, id: Date.now() }])
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Collections</h1>
          <p className="text-muted-foreground text-sm mt-1">{collections.length} collections total</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-1" />
          Add Collection
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Products</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Visible</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {collections.map((col) => (
              <tr key={col.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-secondary whitespace-nowrap">{col.name}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{col.description}</td>
                <td className="px-4 py-3 text-muted-foreground">{col.productCount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${col.visible ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {col.visible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(col)} className="p-1.5 hover:bg-muted rounded transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => handleDelete(col.id)} className="p-1.5 hover:bg-muted rounded transition-colors">
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
          <div className="bg-white rounded-xl border border-border w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-secondary">{editingId ? 'Edit Collection' : 'Add Collection'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Collection Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Wedding Gifts"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Brief collection description..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="visible" className="text-sm text-secondary">Visible on site</label>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-border">
              <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                {editingId ? 'Save Changes' : 'Add Collection'}
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
