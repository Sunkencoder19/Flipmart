import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

// Fallback mock data
const mockProducts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
    price: 8299,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    stock: 50,
    rating: { average: 4.5, count: 124 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Smart Watch Series 7',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50m.',
    price: 24999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'],
    stock: 30,
    rating: { average: 4.7, count: 89 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton crew neck t-shirt. Soft, breathable, and ethically sourced. Available in multiple colors and sizes. Perfect for everyday wear.',
    price: 2499,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    stock: 100,
    rating: { average: 4.3, count: 67 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'Leather Laptop Bag',
    description: 'Handcrafted genuine leather laptop bag with padded compartment for 15" laptops. Multiple pockets for accessories. Professional and durable design.',
    price: 12499,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    stock: 25,
    rating: { average: 4.6, count: 43 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Fitness Tracker Band',
    description: 'Lightweight fitness tracker with 24/7 heart rate monitoring, step counting, sleep analysis, and smartphone notifications. 10-day battery life.',
    price: 6649,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'],
    stock: 75,
    rating: { average: 4.2, count: 156 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    name: 'Ceramic Coffee Mug',
    description: 'Handcrafted ceramic coffee mug for coffee lovers',
    price: 1659,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'],
    stock: 200,
    rating: { average: 4.4, count: 92 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '7',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical gaming keyboard with Cherry MX Blue switches, programmable keys, and anti-ghosting technology. Built for competitive gaming.',
    price: 7469,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500'],
    stock: 45,
    rating: { average: 4.6, count: 78 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '8',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 2904,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
    stock: 120,
    rating: { average: 4.3, count: 156 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '9',
    name: 'Denim Jacket',
    description: 'Classic blue denim jacket made from premium cotton denim. Vintage-inspired design with modern fit. Perfect layering piece for any season.',
    price: 6649,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
    stock: 60,
    rating: { average: 4.5, count: 89 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '10',
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with advanced cushioning',
    price: 10789,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    stock: 85,
    rating: { average: 4.7, count: 203 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '11',
    name: 'Vintage Sunglasses',
    description: 'Retro-style sunglasses with UV protection',
    price: 4149,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    stock: 95,
    rating: { average: 4.2, count: 67 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '12',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with premium sound',
    price: 5809,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    stock: 110,
    rating: { average: 4.4, count: 134 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '13',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat perfect for home workouts',
    price: 3319,
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'],
    stock: 150,
    rating: { average: 4.6, count: 98 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '14',
    name: 'Wooden Cutting Board',
    description: 'Handcrafted bamboo cutting board for kitchen',
    price: 2074,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'],
    stock: 75,
    rating: { average: 4.3, count: 54 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '15',
    name: 'Canvas Backpack',
    description: 'Vintage-style canvas backpack for daily use',
    price: 4979,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    stock: 40,
    rating: { average: 4.5, count: 72 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '16',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24hrs',
    price: 2323,
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'],
    stock: 180,
    rating: { average: 4.8, count: 145 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '17',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation, touch controls, and wireless charging case. Crystal clear audio with 24-hour total playback.',
    price: 12449,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'],
    stock: 65,
    rating: { average: 4.5, count: 189 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '18',
    name: 'Hoodie Sweatshirt',
    description: 'Comfortable cotton blend hoodie in multiple colors',
    price: 4564,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'],
    stock: 90,
    rating: { average: 4.4, count: 112 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '19',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    price: 3734,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    stock: 55,
    rating: { average: 4.6, count: 87 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '20',
    name: 'Smartphone Case',
    description: 'Shockproof phone case with card holder',
    price: 1410,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1601593346740-925612772716?w=500'],
    stock: 200,
    rating: { average: 4.2, count: 156 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// GET /api/products - Get all products with filtering and pagination
export async function GET(request: NextRequest) {
  console.log('Products API called - using mock data due to database issues')
  
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const category = searchParams.get('category')
  const sortBy = searchParams.get('sortBy') || 'name'
  const sortOrder = searchParams.get('sortOrder') || 'asc'
  
  // Filter mock data based on category
  let filteredProducts = mockProducts
  if (category && category !== 'all' && category !== '') {
    filteredProducts = mockProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      const comparison = a.price - b.price
      return sortOrder === 'desc' ? -comparison : comparison
    } else if (sortBy === 'name') {
      const comparison = a.name.localeCompare(b.name)
      return sortOrder === 'desc' ? -comparison : comparison
    } else if (sortBy === 'rating') {
      const comparison = a.rating.average - b.rating.average
      return sortOrder === 'desc' ? -comparison : comparison
    }
    return 0
  })
  
  // Simple pagination for mock data
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  
  const totalCount = filteredProducts.length
  const totalPages = Math.ceil(totalCount / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  
  return NextResponse.json({
    products: paginatedProducts,
    categories: ['Electronics', 'Clothing', 'Accessories', 'Home & Kitchen', 'Sports'],
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage,
      hasPrevPage,
      limit
    },
    fallbackMode: true // Indicate this is fallback data
  })
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const productData = await request.json()
    
    // Generate SKU if not provided
    if (!productData.sku) {
      productData.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    }
    
    const product = new Product(productData)
    await product.save()
    
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
