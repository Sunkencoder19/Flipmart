'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Orders",
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive tracking information via email once your order ships."
  },
  {
    category: "Orders",
    question: "Can I modify or cancel my order?",
    answer: "You can modify or cancel your order within 30 minutes of placing it. After that, please contact our customer support team for assistance."
  },
  {
    category: "Shipping",
    question: "What are your shipping options?",
    answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and same-day delivery in select cities across India."
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. We're working on expanding our international shipping options and will announce updates soon."
  },
  {
    category: "Shipping",
    question: "Is there a minimum order for free shipping?",
    answer: "Yes, we offer free standard shipping on orders above ₹999. Orders below this amount have a shipping charge of ₹99."
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Electronics have a 15-day return window."
  },
  {
    category: "Returns",
    question: "How do I initiate a return?",
    answer: "Log into your account, go to 'My Orders', find the item you want to return, and click 'Return Item'. You can also contact our support team for assistance."
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) for orders above ₹500."
  },
  {
    category: "Payments",
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard SSL encryption and partner with trusted payment gateways to ensure your payment information is completely secure."
  },
  {
    category: "Account",
    question: "How do I create an account?",
    answer: "Click on 'Sign Up' in the top right corner, enter your email and create a password. You can also sign up using your phone number or social media accounts."
  },
  {
    category: "Account",
    question: "I forgot my password. How can I reset it?",
    answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link."
  },
  {
    category: "Products",
    question: "Are your product images accurate?",
    answer: "We strive to display accurate product images and descriptions. However, colors may vary slightly due to screen settings. If you're not satisfied, our return policy covers such cases."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about FlipMart orders, shipping, returns, and more.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-100 rounded-full mr-3">
                    {item.category}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                </div>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-primary-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-primary-100 mb-6">
            Our customer support team is here to help you with any additional questions.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
