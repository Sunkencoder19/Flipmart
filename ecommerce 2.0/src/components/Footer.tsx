import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Shield, Truck, HeadphonesIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">FlipMart</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              India's trusted online marketplace offering premium quality products 
              at competitive prices. Experience hassle-free shopping with fast delivery 
              and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/flipmart" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/flipmart" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/flipmart" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Free Delivery on ₹500+</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">100% Secure Payments</span>
              </li>
              <li className="flex items-center space-x-2">
                <HeadphonesIcon className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">24/7 Customer Support</span>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  FlipMart Headquarters<br />
                  Sector 44, Gurgaon<br />
                  Haryana 122003, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+91 124-456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">support@flipmart.com</span>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400">
                  <strong className="text-blue-400">Business Hours:</strong><br />
                  Mon-Sat: 9:00 AM - 9:00 PM IST<br />
                  Sunday: 10:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © 2025 FlipMart. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                GST Registration: 07AABCU9603R1ZX | CIN: U74999DL2020PTC362476
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link href="/privacy" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Shipping Policy
              </Link>
              <Link href="/cancellation" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Cancellation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
