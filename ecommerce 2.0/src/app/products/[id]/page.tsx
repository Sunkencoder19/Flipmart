'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, ArrowLeft, Heart, Share } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Breadcrumb from '@/components/Breadcrumb'

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  description: string
  category: string
  stock: number
  rating: {
    average: number
    count: number
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(\`/api/products/\${id}\`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        console.error('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        description: product.description,
        category: product.category
      }
      
      for (let i = 0; i < quantity; i++) {
        addItem(productToAdd)
      }
      alert('Product added to cart!')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={\`h-4 w-4 \${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }\`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.category, href: \`/products?category=\${product.category}\` },
    { label: product.name, href: '#' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={\`aspect-square relative overflow-hidden rounded-md border-2 \${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }\`}
                >
                  <Image
                    src={image}
                    alt={\`\${product.name} \${index + 1}\`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating.average)}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.average} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            <p className="text-sm text-gray-500 mt-1">Price includes 18% GST</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                {Array.from({ length: Math.min(10, product.stock) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {product.stock > 0 ? (
                <span className="text-green-600">✓ In stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">✗ Out of stock</span>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="text-sm font-medium text-gray-900 w-24">Category:</dt>
                <dd className="text-sm text-gray-600">{product.category}</dd>
              </div>
              <div className="flex">
                <dt className="text-sm font-medium text-gray-900 w-24">Stock:</dt>
                <dd className="text-sm text-gray-600">{product.stock} units</dd>
              </div>
              <div className="flex">
                <dt className="text-sm font-medium text-gray-900 w-24">Rating:</dt>
                <dd className="text-sm text-gray-600">
                  {product.rating.average}/5 ({product.rating.count} reviews)
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
