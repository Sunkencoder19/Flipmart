import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

// GET /api/cart - Get user's cart items
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
    
    // Find user and get cart items
    const user = await User.findOne({ firebaseUid }).select('cart')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ cart: user.cart || [] })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Update user's cart
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { firebaseUid, cart } = await request.json()
    
    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Firebase UID is required' },
        { status: 400 }
      )
    }
    
    // Update user's cart
    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { cart: cart },
      { new: true, upsert: false }
    )
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cart updated successfully',
      cart: user.cart 
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Clear user's cart
export async function DELETE(request: NextRequest) {
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
    
    // Clear user's cart
    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { cart: [] },
      { new: true }
    )
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cart cleared successfully' 
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
