// Product interface
export interface Product {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  category: string
  stock: number
  rating: {
    average: number
    count: number
  }
}

// Products data
export const products: Product[] = [
  {
    "id": "1",
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
    "price": 8299,
    "category": "Electronics",
    "images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    "stock": 50,
    "rating": { "average": 4.5, "count": 124 }
  },
  {
    "id": "2", 
    "name": "Smart Fitness Watch",
    "description": "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    "price": 12499,
    "category": "Electronics",
    "images": ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    "stock": 30,
    "rating": { "average": 4.3, "count": 89 }
  },
  {
    "id": "3",
    "name": "Cotton Casual T-Shirt",
    "description": "Comfortable 100% cotton t-shirt in multiple colors. Soft fabric, perfect fit, and durable construction for everyday wear.",
    "price": 899,
    "category": "Fashion",
    "images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    "stock": 100,
    "rating": { "average": 4.2, "count": 156 }
  },
  {
    "id": "4",
    "name": "Denim Jeans",
    "description": "Classic slim-fit denim jeans made from premium cotton blend. Versatile style suitable for casual and semi-formal occasions.",
    "price": 2499,
    "category": "Fashion", 
    "images": ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
    "stock": 75,
    "rating": { "average": 4.4, "count": 203 }
  },
  {
    "id": "5",
    "name": "Ceramic Coffee Mug Set",
    "description": "Elegant set of 4 ceramic coffee mugs with modern design. Microwave and dishwasher safe. Perfect for home or office use.",
    "price": 1299,
    "category": "Home & Garden",
    "images": ["https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500"],
    "stock": 60,
    "rating": { "average": 4.6, "count": 78 }
  },
  {
    "id": "6",
    "name": "Yoga Mat Premium",
    "description": "Non-slip yoga mat made from eco-friendly materials. 6mm thickness provides excellent cushioning and support for all yoga practices.",
    "price": 1899,
    "category": "Sports & Outdoors",
    "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
    "stock": 45,
    "rating": { "average": 4.7, "count": 134 }
  },
  {
    "id": "7",
    "name": "The Psychology of Programming",
    "description": "Insightful book exploring the cognitive aspects of software development and programming methodologies. A must-read for developers.",
    "price": 699,
    "category": "Books",
    "images": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"],
    "stock": 25,
    "rating": { "average": 4.8, "count": 67 }
  },
  {
    "id": "8",
    "name": "LED Desk Lamp",
    "description": "Adjustable LED desk lamp with touch controls, multiple brightness levels, and USB charging port. Perfect for study and work.",
    "price": 3299,
    "category": "Electronics",
    "images": ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
    "stock": 40,
    "rating": { "average": 4.4, "count": 92 }
  },
  {
    "id": "9",
    "name": "Leather Wallet",
    "description": "Genuine leather bi-fold wallet with multiple card slots and bill compartment. Handcrafted with attention to detail.",
    "price": 1799,
    "category": "Fashion",
    "images": ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"],
    "stock": 35,
    "rating": { "average": 4.5, "count": 118 }
  },
  {
    "id": "10",
    "name": "Indoor Plant Pot Set",
    "description": "Set of 3 decorative ceramic pots with drainage holes. Perfect for small indoor plants and herbs. Includes saucers.",
    "price": 2199,
    "category": "Home & Garden",
    "images": ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"],
    "stock": 50,
    "rating": { "average": 4.3, "count": 85 }
  },
  {
    "id": "11",
    "name": "Running Shoes",
    "description": "Lightweight running shoes with breathable mesh upper and responsive cushioning. Ideal for daily runs and training.",
    "price": 4999,
    "category": "Sports & Outdoors",
    "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
    "stock": 65,
    "rating": { "average": 4.6, "count": 201 }
  },
  {
    "id": "12",
    "name": "Programming Fundamentals",
    "description": "Comprehensive guide to programming concepts and best practices. Covers multiple programming languages and methodologies.",
    "price": 899,
    "category": "Books",
    "images": ["https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500"],
    "stock": 30,
    "rating": { "average": 4.7, "count": 143 }
  },
  {
    "id": "13",
    "name": "Smartphone Stand",
    "description": "Adjustable aluminum smartphone stand compatible with all phone sizes. Perfect for video calls, watching videos, and hands-free use.",
    "price": 1499,
    "category": "Electronics",
    "images": ["https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500"],
    "stock": 80,
    "rating": { "average": 4.2, "count": 156 }
  },
  {
    "id": "14",
    "name": "Casual Sneakers",
    "description": "Comfortable casual sneakers with modern design. Made from premium materials with excellent durability and style.",
    "price": 3499,
    "category": "Fashion",
    "images": ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
    "stock": 55,
    "rating": { "average": 4.4, "count": 187 }
  },
  {
    "id": "15",
    "name": "Kitchen Knife Set",
    "description": "Professional 5-piece kitchen knife set with wooden block. Sharp, durable blades perfect for all cooking needs.",
    "price": 5499,
    "category": "Home & Garden",
    "images": ["https://images.unsplash.com/photo-1594736797933-d0301ba8ffba?w=500"],
    "stock": 20,
    "rating": { "average": 4.8, "count": 94 }
  },
  {
    "id": "16",
    "name": "Basketball",
    "description": "Official size basketball with excellent grip and bounce. Perfect for indoor and outdoor courts. Professional quality.",
    "price": 2299,
    "category": "Sports & Outdoors",
    "images": ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500"],
    "stock": 40,
    "rating": { "average": 4.5, "count": 122 }
  },
  {
    "id": "17",
    "name": "JavaScript: The Complete Guide",
    "description": "In-depth guide to JavaScript programming from basics to advanced concepts. Includes modern ES6+ features and best practices.",
    "price": 1199,
    "category": "Books",
    "images": ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
    "stock": 35,
    "rating": { "average": 4.9, "count": 289 }
  },
  {
    "id": "18",
    "name": "Wireless Charger",
    "description": "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overheat protection.",
    "price": 2799,
    "category": "Electronics",
    "images": ["https://images.unsplash.com/photo-1609694760283-4c5caa6e5d44?w=500"],
    "stock": 70,
    "rating": { "average": 4.3, "count": 164 }
  },
  {
    "id": "19",
    "name": "Summer Dress",
    "description": "Light and airy summer dress in floral print. Made from breathable fabric, perfect for casual outings and warm weather.",
    "price": 1999,
    "category": "Fashion",
    "images": ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"],
    "stock": 45,
    "rating": { "average": 4.6, "count": 178 }
  },
  {
    "id": "20",
    "name": "Garden Tool Set",
    "description": "Complete 10-piece garden tool set with ergonomic handles. Includes trowel, pruners, gloves, and other essential gardening tools.",
    "price": 3899,
    "category": "Home & Garden",
    "images": ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500"],
    "stock": 25,
    "rating": { "average": 4.7, "count": 103 }
  }
]
