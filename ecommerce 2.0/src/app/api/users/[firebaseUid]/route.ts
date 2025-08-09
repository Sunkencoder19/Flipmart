import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

// GET /api/users/[firebaseUid] - Get user by Firebase UID
export async function GET(
  request: NextRequest,
  { params }: { params: { firebaseUid: string } }
) {
  try {
    await dbConnect()
    
    const user = await User.findOne({ firebaseUid: params.firebaseUid })
      .populate('orders')
      .populate('wishlist')
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[firebaseUid] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { firebaseUid: string } }
) {
  try {
    await dbConnect()
    
    const updateData = await request.json()
    
    const user = await User.findOneAndUpdate(
      { firebaseUid: params.firebaseUid },
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[firebaseUid] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { firebaseUid: string } }
) {
  try {
    await dbConnect()
    
    const user = await User.findOneAndDelete({ firebaseUid: params.firebaseUid })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
