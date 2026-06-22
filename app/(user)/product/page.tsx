'use client'

import { useState, useMemo, useEffect } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  Grid3x3,
  List,
  Search,
  X,
  Sliders,
} from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  isActive: boolean
  rating: number
  reviews: number
}

const initialCategories = ['All Products']

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  // Filter and sort products
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/categories'),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          console.error('API error:', productsRes.status, categoriesRes.status)
          return
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(
          productsData
            .filter((product: any) => product.isActive)
            .map((product: any) => ({
              id: product.id,
              name: product.name,
              price: Number(product.price ?? 0),
              image: product.images?.[0]?.imageUrl ?? '/placeholder.png',
              category: product.category?.name ?? 'Uncategorized',
              isActive: product.isActive,
              rating: product.rating ?? 4,
              reviews: product.reviews ?? 0,
            }))
        )
        setCategories(['All Products', ...categoriesData.map((category: any) => category.name)])
      } catch (error) {
        console.error('Failed to load products or categories', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      default:
        break
    }

    return filtered
  }, [products, selectedCategory, searchQuery, sortBy])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <div className="hidden sm:flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <aside
            className={`${
              showMobileFilters ? 'block' : 'hidden'
            } fixed inset-0 top-16 z-30 w-64 bg-background border-r border-border p-6 overflow-y-auto sm:sticky sm:top-20 sm:block sm:h-[calc(100vh-80px)] sm:w-64 sm:p-0 sm:bg-transparent sm:border-none`}
          >
            <div className="space-y-6">
              {/* Close button for mobile */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="sm:hidden"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Categories */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowMobileFilters(false)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="border-t border-border pt-4">
                <h3 className="mb-4 font-semibold text-foreground">Sort</h3>
                <div className="space-y-2">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value)
                        setShowMobileFilters(false)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="mb-6 flex items-center justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(true)}
                className="gap-2"
              >
                <Sliders className="h-4 w-4" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
            </div>

            {/* Desktop Sort */}
            <div className="mb-6 hidden sm:flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer pr-8"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/50 py-12">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
