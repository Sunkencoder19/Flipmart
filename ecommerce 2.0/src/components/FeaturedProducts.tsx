'use client'

import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart, Product } from '@/context/CartContext'

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 8299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Premium quality wireless headphones with noise cancellation',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 16599,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Track your fitness goals with this advanced smartwatch',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Comfortable and sustainable organic cotton t-shirt',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Coffee Maker Pro',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Professional grade coffee maker for the perfect brew',
    category: 'Home & Garden'
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    price: 4149,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Non-slip premium yoga mat for all skill levels',
    category: 'Sports & Outdoors'
  },
  {
    id: 6,
    name: 'Skincare Set',
    price: 6649,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Complete skincare routine with natural ingredients',
    category: 'Beauty'
  }
]

export default function FeaturedProducts() {
  const { addItem } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600">
            Discover our most popular and highly-rated products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 font-medium">{product.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
