'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { CategoryForm } from './category-form'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'

export function CategoryManagement() {
  const { categories, deleteCategory } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category? Products in this category will not be deleted.')) {
      deleteCategory(id)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCategory(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Categories</h2>
          <p className="text-muted-foreground mt-1">Total: {categories.length} categories</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Category
        </Button>
      </div>

      {/* Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors group"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.src =
                      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop'
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-dashed border-border p-12 text-center">
          <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center opacity-50">
            📁
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No categories yet</h3>
          <p className="text-muted-foreground mb-6">Create your first category to get started</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Category
          </Button>
        </div>
      )}

      {showForm && <CategoryForm category={editingCategory} onClose={handleCloseForm} />}
    </div>
  )
}
