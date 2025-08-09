import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { firebaseUid, email, name, profileImage } = await request.json()

    // Check if user already exists
    let user = await User.findOne({ firebaseUid })

    if (!user) {
      // Create new user
      user = new User({
        firebaseUid,
        email,
        name,
        profileImage,
      })
      await user.save()
    } else {
      // Update existing user
      user.name = name
      user.email = email
      user.profileImage = profileImage
      await user.save()
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}
