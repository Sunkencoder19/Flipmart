# 🛒 FlipMart - Modern E-commerce Platform

<div align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14.2.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
</div>

<div align="center">
  <h3>A full-featured, responsive e-commerce platform built with modern web technologies</h3>
  <p>🇮🇳 Localized for the Indian market with INR pricing and local contact information</p>
</div>

---

## 🌟 Features

### 🛍️ **Core E-commerce Functionality**
- **Product Catalog**: 20+ products across 5 categories (Electronics, Clothing, Accessories, Home & Kitchen, Sports)
- **Shopping Cart**: Add, remove, update quantities with persistent state management
- **Product Search**: Real-time search with debounced filtering across product names, descriptions, and categories
- **Product Sorting**: Sort by name, price (low to high/high to low), and customer ratings
- **Category Filtering**: Filter products by specific categories
- **Product Detail Pages**: Individual pages for each product with full specifications

### 🎨 **User Experience**
- **Responsive Design**: Seamlessly works across desktop, tablet, and mobile devices
- **Loading States**: Beautiful skeleton screens and loading indicators
- **Breadcrumb Navigation**: Clear navigation trails (Home > Products > Category > Product)
- **Search Functionality**: Wide search bar with instant filtering
- **Professional UI**: Clean, modern design with hover effects and smooth transitions

### 🇮🇳 **Indian Market Localization**
- **Currency**: All prices in Indian Rupees (₹) with proper formatting
- **Tax Structure**: 18% GST instead of sales tax
- **Contact Information**: Indian phone numbers (+91), IST timings, Gurgaon address
- **Free Shipping**: Threshold set to ₹4,000 (realistic for Indian market)

### 🔧 **Technical Features**
- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management for shopping cart
- **API Routes**: RESTful API endpoints for products and cart management
- **Image Optimization**: Next.js Image component for optimized loading
- **SEO Ready**: Proper metadata and semantic HTML structure

---

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 14.2.5 |
| **TypeScript** | Type safety and better DX | Latest |
| **Tailwind CSS** | Utility-first CSS framework | 3.4+ |
| **React Context** | Global state management | Built-in |
| **Lucide React** | Beautiful, consistent icons | Latest |
| **MongoDB** | Database (with fallback mock data) | Latest |

---

## 📱 Pages & Components

### **Pages**
- **Homepage** (`/`) - Hero section, featured products, categories
- **Products** (`/products`) - Full product catalog with search and filters
- **Product Detail** (`/products/[id]`) - Individual product pages
- **Shopping Cart** (`/cart`) - Cart management with order summary
- **Categories** (`/categories`) - Category overview
- **Contact** (`/contact`) - Contact form with Indian localization
- **FAQ** (`/faq`) - Comprehensive FAQ system with categories
- **About** (`/about`) - Company information

### **Key Components**
- **Header** - Navigation with cart indicator
- **ProductSkeleton** - Loading state for product cards
- **Breadcrumb** - Navigation trail component
- **FeaturedProducts** - Homepage product showcase
- **CartContext** - Global cart state management

---

## 🎯 Project Highlights

### **Search & Filter System**
```typescript
// Real-time search with local filtering
useEffect(() => {
  if (searchQuery.trim()) {
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(filtered)
  } else {
    setFilteredProducts(allProducts)
  }
}, [searchQuery, allProducts])
```

### **Currency Localization**
```typescript
// Indian Rupee formatting with proper locale
₹{product.price.toLocaleString('en-IN')}
```

### **Responsive Product Grid**
```css
/* Tailwind CSS responsive grid */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

---

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Clone & Install**
```bash
# Clone the repository
git clone https://github.com/Sunkencoder19/Flipmart.git
cd Flipmart

# Install dependencies
npm install

# Run development server
npm run dev
```

### **Environment Setup**
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

### **Available Scripts**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 📊 Product Data Structure

```typescript
interface Product {
  _id: string
  name: string
  price: number              // In Indian Rupees
  images: string[]
  description: string
  category: string
  stock: number
  rating: {
    average: number
    count: number
  }
  sku: string
}
```

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue-600 (#2563EB)
- **Secondary**: Gray shades for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Yellow for alerts

### **Typography**
- **Headings**: Font-bold with responsive sizes
- **Body**: Font-normal with good line-height
- **UI Text**: Font-medium for buttons and labels

### **Spacing**
- Consistent spacing using Tailwind's scale (4, 6, 8, 12px, etc.)
- Responsive padding and margins

---

## 🔮 Future Enhancements

### **Phase 1**
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality

### **Phase 2**
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Admin dashboard for product management
- [ ] Inventory management system
- [ ] Email notifications

### **Phase 3**
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations

---

## 📈 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **SEO Optimization**: Meta tags, semantic HTML, and proper heading structure
- **Loading States**: Skeleton screens for better perceived performance
- **Debounced Search**: Prevents excessive API calls during typing

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Anshuman**
- GitHub: [@Sunkencoder19](https://github.com/Sunkencoder19)
- Project Repository: [FlipMart](https://github.com/Sunkencoder19/Flipmart)
- Portfolio: [Coming Soon]
- Email: [Contact via GitHub]

---

<div align="center">
  <h3>⭐ If you found this project helpful, please give it a star! ⭐</h3>
  <p>Built with ❤️ for the modern web</p>
</div>
