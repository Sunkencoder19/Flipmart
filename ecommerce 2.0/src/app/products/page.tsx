'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Filter, Loader2, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import ProductSkeleton from '@/components/ProductSkeleton'
import Breadcrumb from '@/components/Breadcrumb'

// Updated Product interface to match MongoDB model
interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  description: string
  category: string
  subcategory?: string
  stock: number
  rating: {
    average: number
    count: number
  }
  sku: string
}

interface ProductsResponse {
  products: Product[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const { addItem } = useCart()

  // Fetch products from API only when category or sort changes
  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy])

  // Filter products locally when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(allProducts)
    }
  }, [searchQuery, allProducts])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        category: selectedCategory === 'All' ? '' : selectedCategory,
        limit: '20'
      })

      // Handle sorting parameters
      if (sortBy === 'price-low') {
        params.set('sortBy', 'price')
        params.set('sortOrder', 'asc')
      } else if (sortBy === 'price-high') {
        params.set('sortBy', 'price')
        params.set('sortOrder', 'desc')
      } else if (sortBy === 'rating') {
        params.set('sortBy', 'rating')
        params.set('sortOrder', 'desc')
      } else {
        params.set('sortBy', 'name')
        params.set('sortOrder', 'asc')
      }

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data: ProductsResponse = await response.json()
      setAllProducts(data.products)
      setFilteredProducts(data.products)
      
      // Extract unique categories from products
      const uniqueCategories = ['All', ...Array.from(new Set(data.products.map(p => p.category)))]
      setCategories(uniqueCategories)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    // Convert MongoDB product to CartContext product format
    const cartProduct = {
      id: parseInt(product._id.slice(-8), 16), // Convert MongoDB _id to number
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      description: product.description,
      category: product.category
    }
    addItem(cartProduct)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Products' }
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600 mb-6">Discover our complete collection of amazing products</p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 text-black"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-700">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Show skeleton loading cards
            [...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredProducts.map((product: Product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Link href={`/products/${product._id}`}>
                <div className="relative h-64 cursor-pointer">
                  <Image
                    src={product.images[0] || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <Link href={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-primary-600 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating.average) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating.average.toFixed(1)}) {product.rating.count} reviews
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center space-x-2">
                    {product.stock > 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1 text-sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  )
}
