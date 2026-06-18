'use client'

import { useState, useMemo } from 'react'
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

// Sample product data
const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 129.99,
    originalPrice: 199.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Audio',
    rating: 4.5,
    reviews: 328,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 249.99,
    originalPrice: 349.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Wearables',
    rating: 4.8,
    reviews: 542,
    inStock: true,
  },
  {
    id: '3',
    name: 'Ultra HD 4K Webcam',
    price: 179.99,
    originalPrice: 249.99,
    image:
      'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviews: 189,
    inStock: true,
  },
  {
    id: '4',
    name: 'Mechanical Keyboard RGB',
    price: 89.99,
    originalPrice: 139.99,
    image:
      'https://images.unsplash.com/photo-1587829191301-4b13aaf64bda?w=500&h=500&fit=crop',
    category: 'Peripherals',
    rating: 4.6,
    reviews: 412,
    inStock: true,
  },
  {
    id: '5',
    name: 'Portable SSD 1TB',
    price: 94.99,
    originalPrice: 129.99,
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
    category: 'Storage',
    rating: 4.7,
    reviews: 678,
    inStock: false,
  },
  {
    id: '6',
    name: 'USB-C Fast Charger',
    price: 34.99,
    originalPrice: 49.99,
    image:
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.4,
    reviews: 234,
    inStock: true,
  },
  {
    id: '7',
    name: 'HD Monitor 27 inch',
    price: 199.99,
    originalPrice: 299.99,
    image:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    category: 'Displays',
    rating: 4.5,
    reviews: 156,
    inStock: true,
  },
  {
    id: '8',
    name: 'Wireless Mouse',
    price: 29.99,
    originalPrice: 44.99,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Peripherals',
    rating: 4.2,
    reviews: 445,
    inStock: true,
  },
]

const CATEGORIES = [
  'All Products',
  'Audio',
  'Electronics',
  'Wearables',
  'Peripherals',
  'Storage',
  'Accessories',
  'Displays',
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS

    // Filter by category
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // newest
        break
    }

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

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
                  {CATEGORIES.map((category) => (
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
            {filteredProducts.length > 0 ? (
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
