import { config } from 'dotenv'
import { resolve } from 'path'
import mongoose from 'mongoose'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI

console.log('Testing MongoDB connection...')
console.log('MONGODB_URI exists:', !!MONGODB_URI)

async function testConnection() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables')
    }

    await mongoose.connect(MONGODB_URI)
    console.log('✅ Successfully connected to MongoDB!')
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String })
    const TestModel = mongoose.model('Test', testSchema)
    
    const doc = new TestModel({ test: 'Hello MongoDB!' })
    await doc.save()
    console.log('✅ Successfully created a test document!')
    
    // Clean up
    await TestModel.deleteMany({})
    console.log('✅ Test document cleaned up!')
    
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB!')
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
  }
}

testConnection()
