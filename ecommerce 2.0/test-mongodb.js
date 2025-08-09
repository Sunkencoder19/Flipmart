const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fattesingr:Anshu1906@cluster0.t7fiaqa.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'

async function testConnection() {
  try {
    console.log('Testing MongoDB Atlas connection...')
    console.log('Connection string:', MONGODB_URI.replace(/:[^:@]*@/, ':***@'))
    
    const opts = {
      bufferCommands: false,
    }

    const connection = await mongoose.connect(MONGODB_URI, opts)
    console.log('✅ MongoDB connection successful!')
    console.log('Connection state:', connection.connection.readyState)
    console.log('Database name:', connection.connection.name)
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB connection failed:')
    console.error('Error:', error.message)
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.error('\n🔧 Solution: Add your IP address to MongoDB Atlas whitelist')
      console.error('Your current IP: 49.36.104.12')
      console.error('1. Go to MongoDB Atlas dashboard')
      console.error('2. Navigate to Network Access')
      console.error('3. Add IP: 49.36.104.12 or 0.0.0.0/0 for all IPs (development only)')
    }
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('\n🔧 Solution: SSL/TLS configuration issue')
      console.error('Check your connection string and SSL settings')
    }
    if (error.message.includes('authentication')) {
      console.error('\n🔧 Solution: Database authentication failed')
      console.error('Check your username and password in the connection string')
    }
    process.exit(1)
  }
}

testConnection()
