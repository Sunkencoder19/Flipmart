import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { firebaseUid, name, profileImage, phone, address } = await request.json()

    const user = await User.findOne({ firebaseUid })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user fields
    if (name) user.name = name
    if (profileImage !== undefined) user.profileImage = profileImage
    if (phone !== undefined) user.phone = phone
    if (address) user.address = address

    await user.save()

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

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

    const user = await User.findOne({ firebaseUid }).populate('orders')

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
