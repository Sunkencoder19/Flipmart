import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'

// POST /api/orders/test - Create a test order for development
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { firebaseUid } = await request.json()
    
    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Firebase UID is required' },
        { status: 400 }
      )
    }
    
    // Find user by Firebase UID
    const user = await User.findOne({ firebaseUid })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Create test order
    const testOrder = new Order({
      userId: user._id,
      orderNumber,
      items: [
        {
          productId: '67676767676767676767676a',
          name: 'Wireless Bluetooth Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          price: 199.99,
          quantity: 1
        },
        {
          productId: '67676767676767676767676b',
          name: 'Gaming Mechanical Keyboard',
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
          price: 129.99,
          quantity: 2
        }
      ],
      totalAmount: 459.97,
      status: 'processing',
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA'
      },
      paymentMethod: 'card'
    })
    
    await testOrder.save()
    
    // Add order to user's orders array
    user.orders.push(testOrder._id)
    await user.save()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test order created successfully',
      order: testOrder 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating test order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
