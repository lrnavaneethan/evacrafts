'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image_url: string
  created_at: string
}

export interface Product {
  id: string
  category_id: string
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  discount_price?: number
  image_url: string
  gallery_images: string[]
  stock_quantity: number
  sku: string
  is_featured: boolean
  is_active: boolean
  created_at: string
}

interface AdminContextType {
  categories: Category[]
  products: Product[]
  addCategory: (category: Omit<Category, 'id' | 'created_at'>) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Initial mock data
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Personalized Gifts',
    description: 'Custom personalized gift items',
    slug: 'personalized-gifts',
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jewelry',
    description: 'Beautiful handmade jewelry',
    slug: 'jewelry',
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    created_at: new Date().toISOString(),
  },
]

const initialProducts: Product[] = [
  {
    id: '1',
    category_id: '1',
    name: 'Personalized Photo Frame',
    slug: 'personalized-photo-frame',
    description: 'Beautiful custom photo frame with your memories',
    long_description: 'Create a lasting memory with our personalized photo frame. Made with premium materials and custom engraving options.',
    price: 45,
    image_url: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop',
    ],
    stock_quantity: 50,
    sku: 'PPF-001',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    category_id: '2',
    name: 'Handmade Silver Bracelet',
    slug: 'handmade-silver-bracelet',
    description: 'Elegant silver bracelet crafted by hand',
    long_description: 'Stunning handcrafted silver bracelet with unique design. Perfect for any occasion.',
    price: 65,
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    ],
    stock_quantity: 30,
    sku: 'HSB-001',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('admin_categories')
    const savedProducts = localStorage.getItem('admin_products')
    const adminStatus = localStorage.getItem('admin_authenticated')

    setCategories(savedCategories ? JSON.parse(savedCategories) : initialCategories)
    setProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts)
    setIsAdmin(adminStatus === 'true')
  }, [])

  // Save categories to localStorage
  useEffect(() => {
    localStorage.setItem('admin_categories', JSON.stringify(categories))
  }, [categories])

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products))
  }, [products])

  const addCategory = (category: Omit<Category, 'id' | 'created_at'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    setCategories([...categories, newCategory])
  }

  const updateCategory = (id: string, updatedData: Partial<Category>) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, ...updatedData } : cat
      )
    )
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const addProduct = (product: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    setProducts([...products, newProduct])
  }

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(
      products.map((prod) =>
        prod.id === id ? { ...prod, ...updatedData } : prod
      )
    )
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter((prod) => prod.id !== id))
  }

  return (
    <AdminContext.Provider
      value={{
        categories,
        products,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
