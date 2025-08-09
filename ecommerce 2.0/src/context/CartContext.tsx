'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'

export interface Product {
  id: number | string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
  syncing: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number | string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number | string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SYNCING'; payload: boolean }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems)
        }
      }
    }
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems)
      }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      }
    }
    case 'SET_CART': {
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload)
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload
      }
    }
    case 'SET_SYNCING': {
      return {
        ...state,
        syncing: action.payload
      }
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      }
    default:
      return state
  }
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

interface CartContextType {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (id: number | string) => void
  updateQuantity: (id: number | string, quantity: number) => void
  clearCart: () => void
  syncCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    loading: false, 
    syncing: false 
  })

  // Sync cart with database
  const syncCart = useCallback(async () => {
    if (!user?.uid) return

    try {
      dispatch({ type: 'SET_SYNCING', payload: true })
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          cart: state.items.map(item => ({
            productId: item.id.toString(),
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
            category: item.category,
            quantity: item.quantity
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to sync cart')
      }
    } catch (error) {
      console.error('Error syncing cart:', error)
    } finally {
      dispatch({ type: 'SET_SYNCING', payload: false })
    }
  }, [user?.uid, state.items])

  // Load cart from database when user logs in
  const loadCart = useCallback(async () => {
    if (!user?.uid) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      const response = await fetch(`/api/cart?firebaseUid=${user.uid}`)
      if (!response.ok) {
        throw new Error('Failed to load cart')
      }

      const data = await response.json()
      const cartItems: CartItem[] = (data.cart || []).map((item: any) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
        quantity: item.quantity
      }))

      dispatch({ type: 'SET_CART', payload: cartItems })
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [user?.uid])

  // Load cart when user logs in
  useEffect(() => {
    if (user?.uid) {
      loadCart()
    } else {
      // Clear cart when user logs out
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [user?.uid, loadCart])

  // Sync cart to database whenever cart changes (debounced)
  useEffect(() => {
    if (user?.uid && state.items.length > 0 && !state.loading) {
      const timeoutId = setTimeout(() => {
        syncCart()
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [state.items, user?.uid, state.loading, syncCart])

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItem = (id: number | string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: number | string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    // Also clear from database if user is logged in
    if (user?.uid) {
      fetch(`/api/cart?firebaseUid=${user.uid}`, {
        method: 'DELETE'
      }).catch(console.error)
    }
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, syncCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
