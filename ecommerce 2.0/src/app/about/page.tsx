import Image from 'next/image'
import Link from 'next/link'
import { Users, Target, Award, Heart, ShoppingBag, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About FlipMart</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're passionate about bringing you the best products at amazing prices, 
              with an exceptional shopping experience that puts you first.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2025, FlipMart started with a simple vision: to make online shopping 
                  easier, more enjoyable, and accessible to everyone. What began as a small startup 
                  has grown into a trusted destination for millions of customers worldwide.
                </p>
                <p>
                  We believe that great products should be available to everyone, regardless of 
                  location or budget. That's why we work directly with manufacturers and suppliers 
                  to bring you the best prices without compromising on quality.
                </p>
                <p>
                  Today, we're proud to offer over 10,000 products across multiple categories, 
                  from the latest electronics to timeless fashion pieces, all backed by our 
                  commitment to customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our team working"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is centered around providing the best possible 
                experience for our customers.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Promise</h3>
              <p className="text-gray-600">
                We carefully curate our products to ensure you receive only the highest 
                quality items at competitive prices.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600">
                We ship worldwide and work with international suppliers to bring you 
                products from around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <div className="text-primary-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our mission"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-8 w-8 text-primary-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  To democratize access to quality products by creating a seamless, 
                  trustworthy, and enjoyable online shopping experience that connects 
                  customers with the products they love.
                </p>
                <p>
                  We strive to be more than just an online store – we want to be your 
                  trusted partner in finding exactly what you need, when you need it, 
                  at a price that makes sense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate people behind FlipMart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto mb-4">
                <Image
                  src="/images/profile.jpg"
                  alt="CEO"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Fattesing Rane</h3>
              <p className="text-primary-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Passionate about creating exceptional customer experiences and building lasting relationships.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto mb-4">
                <Image
                  src="/images/profile.jpg"
                  alt="CTO"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Fattesing Rane</h3>
              <p className="text-primary-600 mb-2">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Leading our technology vision to create innovative solutions for modern commerce.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto mb-4">
                <Image
                  src="/images/profile.jpg"
                  alt="COO"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Fattesing Rane</h3>
              <p className="text-primary-600 mb-2">Chief Operations Officer</p>
              <p className="text-gray-600 text-sm">
                Ensuring smooth operations and that every order reaches our customers perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 text-primary-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join millions of satisfied customers and discover amazing products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold inline-block text-center"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold inline-block text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
