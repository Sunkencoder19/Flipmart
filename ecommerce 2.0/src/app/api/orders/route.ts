import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const firebaseUid = searchParams.get('firebaseUid')

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Firebase UID is required' },
        { status: 400 }
      )
    }

    // Find user by Firebase UID
    const user = await User.findOne({ firebaseUid })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get orders for this user
    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(10)

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { 
      firebaseUid, 
      items, 
      totalAmount, 
      shippingAddress, 
      paymentMethod 
    } = await request.json()

    // Find user by Firebase UID
    const user = await User.findOne({ firebaseUid })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate order number
    const orderCount = await Order.countDocuments()
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(3, '0')}`

    // Create new order
    const order = new Order({
      userId: user._id,
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending',
    })

    await order.save()

    // Add order to user's orders array
    user.orders.push(order._id)
    await user.save()

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
