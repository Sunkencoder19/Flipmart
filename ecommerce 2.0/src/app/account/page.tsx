"use client"
import { User, Settings, Package, Heart, LogOut, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'

interface Order {
  _id: string
  orderNumber: string
  items: {
    productId: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  // Fetch user's orders when component mounts
  useEffect(() => {
    if (user?.uid) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    if (!user?.uid) return
    
    try {
      setOrdersLoading(true)
      setOrdersError(null)
      
      const response = await fetch(`/api/orders?firebaseUid=${user.uid}`)
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      setOrdersError(error instanceof Error ? error.message : 'Failed to load orders')
    } finally {
      setOrdersLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading your account...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">You must be signed in to view your account.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-600">Manage your account settings and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full object-cover bg-gray-100" />
                ) : (
                  <div className="bg-primary-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{user.displayName || user.email?.split('@')[0]}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-primary-50 text-primary-600">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-red-600 w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Message */}
            <div className="bg-primary-600 text-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.displayName || user.email?.split('@')[0]}!</h2>
              <p className="text-primary-100">
                Thank you for being a valued customer. Here's your account overview.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{orders.reduce((total, order) => total + order.totalAmount, 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">₹</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Wishlist Items</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              
              {ordersLoading ? (
                <div className="p-6 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-600" />
                  <p className="text-gray-600">Loading your orders...</p>
                </div>
              ) : ordersError ? (
                <div className="p-6 text-center">
                  <p className="text-red-600 mb-4">Error: {ordersError}</p>
                  <button
                    onClick={fetchOrders}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : orders.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            ₹{order.totalAmount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={item.image || '/placeholder-image.jpg'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center justify-center text-sm text-gray-500">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {orders.length > 5 && (
                    <div className="p-6 text-center">
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        View All Orders ({orders.length})
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                  <p className="text-gray-500 mb-4">You haven't made any orders yet. Start shopping to see your orders here!</p>
                  <a 
                    href="/products" 
                    className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Start Shopping
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
