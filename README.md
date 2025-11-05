# 🛍️ Amazon Clone - Full-Stack E-Commerce Platform

<div align="center">

![Amazon Clone](https://img.shields.io/badge/Amazon-Clone-FF9900?style=for-the-badge&logo=amazon&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A pixel-perfect, production-ready Amazon.in clone with 90+ products, advanced search, and complete e-commerce functionality.**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

---

## 📖 About This Project

This is a **complete, production-ready Amazon clone** that replicates the entire Amazon.in shopping experience. Built with modern web technologies, it features a fully functional e-commerce platform with authentication, product browsing, advanced search, shopping cart, checkout process, and order management.

### 🎯 **What Makes This Special?**

- ✨ **Pixel-Perfect Design** - Exact replica of Amazon's UI/UX
- 🛍️ **90+ Real Products** - Across 15 diverse categories with accurate images
- 🔍 **Advanced Search** - Multi-field search with smart filtering
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🔐 **Complete Auth System** - Login, register, session management
- 💳 **Full Checkout Flow** - Address validation, multiple payment methods
- 🎨 **Amazon Styling** - Authentic colors, fonts, and layouts
- ⚡ **Production Ready** - Optimized, validated, and documented

## ✨ Features

### 🏠 **Homepage**
- **Auto-Sliding Hero Carousel** - 4 promotional banners with smooth transitions
- **Product Carousels** - Horizontal scrolling with navigation buttons
- **Category Cards** - 8 clickable category tiles with images
- **Today's Deals** - Featured products with countdown timer
- **Benefits Bar** - Free delivery, secure payment, easy returns, COD
- **Promotional Banner** - Dismissible sale notifications
- **Back to Top Button** - Smooth scroll to top

### 🔐 **Authentication**
- **Login System** - Email/password with real-time validation
- **Registration** - New user signup with password strength indicator
- **Session Management** - Persistent login across page reloads
- **Password Visibility Toggle** - Show/hide password
- **Error Handling** - Specific error messages for each validation
- **Duplicate Prevention** - Checks for existing accounts
- **Loading States** - Visual feedback during authentication

### 🛍️ **Product Catalog**
- **90+ Products** - Real products from Apple, Samsung, Nike, Sony, etc.
- **15 Categories** - Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty, Toys, Grocery, Automotive, Health, Office, Pet Supplies, Baby, Musical Instruments, Garden
- **Accurate Images** - High-quality product images from Unsplash
- **Complete Details** - Title, brand, price, rating, reviews, features
- **Stock Management** - Real-time stock levels and warnings
- **Prime Indicators** - Free delivery badges
- **Discount Badges** - Deal of the Day, Best Seller, Top Rated

### 🔍 **Advanced Search**
- **Multi-Field Search** - Searches title, brand, category, description, features
- **Multi-Word Support** - "nike running shoes" finds all matching products
- **Smart Filtering** - AND logic for accurate results
- **Instant Results** - Client-side filtering for speed
- **Category Filters** - Filter by any of 15 categories
- **Price Range Slider** - ₹0 to ₹250,000
- **Rating Filter** - 1+ to 4+ stars
- **Results Count** - Shows number of matching products

### 📦 **Product Detail Page**
- **Breadcrumb Navigation** - Easy navigation path
- **Image Gallery** - Multiple product images
- **Complete Information** - All product details and specifications
- **Customer Reviews** - Rating breakdown with percentage bars
- **Related Products** - "Customers who bought this also bought"
- **Quantity Selector** - Dropdown with stock limits
- **Amazon-Style Buttons** - Yellow "Add to Cart", Orange "Buy Now"
- **Delivery Info** - Shipping details and availability
- **Security Badges** - Secure transaction, easy returns

### 🛒 **Shopping Cart**
- **Cart Management** - Add, update, remove items
- **Stock Validation** - Prevents exceeding available stock
- **Low Stock Warnings** - Alerts when less than 10 items available
- **Free Shipping Progress** - Visual progress bar to ₹8,300 threshold
- **Order Summary** - Subtotal, shipping, tax, total
- **Authentication Check** - Redirects to login if not authenticated
- **Empty Cart State** - Friendly message with shopping button
- **Continue Shopping** - Easy return to products

### 💳 **Checkout Process**
- **Shipping Address Form** - Full address validation
- **Indian Phone Validation** - 10-digit mobile number (starts with 6-9)
- **PIN Code Validation** - 6-digit postal code
- **Payment Methods** - Credit/Debit Card, Cash on Delivery, UPI
- **Card Validation** - 16-digit number, MM/YY expiry, CVV
- **Auto-Formatting** - Card number spaces, expiry date format
- **Real-Time Validation** - Errors clear as you type
- **Order Summary** - Complete order review before placing
- **Loading States** - Processing indicator during order
- **Order Confirmation** - Success message with order details

### 📋 **Orders Page**
- **Order History** - All past orders with details
- **Order Status** - Delivered, In Transit, Processing
- **Track Package** - Tracking button for each order
- **View Invoice** - Download invoice option
- **Return Items** - Easy returns for delivered orders
- **Order Details** - Product images, quantities, prices

### 🎨 **UI/UX Excellence**
- **Amazon Color Scheme** - Authentic orange (#FF9900) and dark nav (#232F3E)
- **Smooth Animations** - Hover effects, transitions, carousels
- **Loading States** - Visual feedback for all actions
- **Error States** - Clear error messages with icons
- **Success States** - Toast notifications for confirmations
- **Empty States** - Friendly messages for empty cart/orders
- **Responsive Design** - Perfect on all screen sizes
- **Touch-Friendly** - Large tap targets for mobile

## � Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** (optional)

### Quick Start

```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd shopvibe-clone

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Build output will be in /dist folder
```

### Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 🎮 Usage

### Test Accounts

You can create your own account or use these test credentials:

```
Email: test@example.com
Password: test123

Email: demo@example.com
Password: demo123
```

### Quick Tour

1. **Browse Products** - Start on homepage, explore carousels
2. **Search** - Try "apple iphone", "nike shoes", "wireless headphones"
3. **Filter** - Use category, price, and rating filters
4. **View Details** - Click any product for full information
5. **Add to Cart** - Use yellow "Add to Cart" button
6. **Checkout** - Complete the purchase flow
7. **View Orders** - Check your order history

### Popular Searches

```
"apple iphone"          → iPhones
"samsung galaxy"        → Samsung phones
"wireless headphones"   → Audio products
"nike shoes"            → Nike footwear
"macbook"               → Apple laptops
"gaming"                → Gaming products
"baby products"         → Baby items
"fitness tracker"       → Wearables
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern UI library with hooks
- **TypeScript 5.0** - Type-safe JavaScript
- **Vite 5.4** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components

### Routing & State
- **React Router 6.30** - Client-side routing
- **Context API** - Global state management
- **React Hooks** - useState, useEffect, useMemo, useContext

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form validation
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🛍️ Product Catalog

### 90+ Products Across 15 Categories

#### Electronics (30+ products)
- **Smartphones** - iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, iPhone 14
- **Laptops** - MacBook Air M2, Dell XPS 15, HP Pavilion Gaming
- **Audio** - Sony WH-1000XM5, AirPods Pro, JBL Flip 6
- **Cameras** - Canon EOS R6, GoPro HERO12, DJI Mini 3 Pro
- **Smart Home** - Samsung QLED TV, Echo Dot, Google Nest Hub
- **Gaming** - PlayStation 5, Nintendo Switch, Gaming peripherals

#### Fashion (15+ products)
- **Men's Clothing** - Levi's Jeans, Nike T-Shirts, Formal Shirts
- **Women's Clothing** - Dresses, Jeans, Crop Tops
- **Footwear** - Nike Air Max, Adidas Ultraboost, Puma Sneakers
- **Accessories** - Ray-Ban Sunglasses, Fossil Wallets, Titan Watches

#### Home & Kitchen (12+ products)
- **Appliances** - Instant Pot, Philips Air Fryer, Dyson Vacuum
- **Furniture** - IKEA Armchair, Dining Table, Office Chair
- **Cookware** - Pressure Cooker, Dinner Set, Coffee Maker

#### Other Categories
- **Books** - Atomic Habits, Psychology of Money, Harry Potter
- **Sports & Fitness** - Fitbit, Yoga Mat, Dumbbells, Badminton Racket
- **Beauty & Personal Care** - L'Oreal, Maybelline, Neutrogena, Philips Trimmer
- **Toys & Games** - LEGO, Barbie, Hot Wheels, Monopoly
- **Grocery & Gourmet** - Olive Oil, Coffee, Tea, Chocolate
- **Automotive** - Car Battery, GPS Navigator, Car Care Kit
- **Health & Wellness** - Blood Pressure Monitor, Glucometer, Vitamins
- **Office Products** - HP Printer, Notebooks, Parker Pen
- **Pet Supplies** - Dog Food, Cat Food, Pet Carrier
- **Baby Products** - Pampers Diapers, Johnson's Shampoo, Feeding Bottles
- **Musical Instruments** - Yamaha Guitar, Casio Keyboard, Roland Drums
- **Garden & Outdoor** - Grass Trimmer, Gardening Tools, Solar Lights

### Real Brands Included
Apple, Samsung, Sony, Nike, Adidas, Levi's, HP, Dell, Canon, GoPro, DJI, LEGO, Barbie, Instant Pot, Philips, Dyson, and 30+ more!

## 📁 Project Structure

```
shopvibe-clone/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Navbar.tsx          # Navigation bar with search
│   │   ├── ProductCard.tsx     # Product display card
│   │   ├── HeroCarousel.tsx    # Auto-sliding banner
│   │   ├── ProductCarousel.tsx # Horizontal product scroll
│   │   ├── CategoryCard.tsx    # Category tile
│   │   ├── PromoBanner.tsx     # Promotional banner
│   │   ├── BackToTop.tsx       # Scroll to top button
│   │   └── DealTimer.tsx       # Countdown timer
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── pages/                  # Page components
│   │   ├── Home.tsx            # Homepage with carousels
│   │   ├── Products.tsx        # Product listing with filters
│   │   ├── ProductDetail.tsx   # Single product page
│   │   ├── Cart.tsx            # Shopping cart
│   │   ├── Checkout.tsx        # Checkout process
│   │   ├── Login.tsx           # Login page
│   │   ├── Register.tsx        # Registration page
│   │   ├── Orders.tsx          # Order history
│   │   └── NotFound.tsx        # 404 page
│   ├── data/
│   │   └── products.ts         # 90+ product database
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── Documentation/              # Comprehensive guides
│   ├── FEATURES_GUIDE.md       # Feature documentation
│   ├── TESTING_GUIDE.md        # Testing instructions
│   ├── PAYMENT_GATEWAY_GUIDE.md # Payment integration
│   ├── EDGE_CASES_IMPROVEMENTS.md # Edge case handling
│   ├── PRODUCTS_UPDATE.md      # Product database details
│   ├── FINAL_AMAZON_CLONE.md   # Complete overview
│   └── QUICK_REFERENCE.md      # Quick commands
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── vite.config.ts              # Vite config
└── README.md                   # This file
```

## 📚 Documentation

Comprehensive documentation is available in the project:

- **[FEATURES_GUIDE.md](FEATURES_GUIDE.md)** - Complete feature documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and tips
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing instructions
- **[PAYMENT_GATEWAY_GUIDE.md](PAYMENT_GATEWAY_GUIDE.md)** - Payment integration guide
- **[EDGE_CASES_IMPROVEMENTS.md](EDGE_CASES_IMPROVEMENTS.md)** - Edge case handling
- **[PRODUCTS_UPDATE.md](PRODUCTS_UPDATE.md)** - Product database details
- **[FINAL_AMAZON_CLONE.md](FINAL_AMAZON_CLONE.md)** - Complete project overview

## 🧪 Testing

### Manual Testing
1. Browse all pages and features
2. Test search with various queries
3. Add/remove items from cart
4. Complete checkout process
5. Test on different screen sizes

### Automated Testing
- Selenium IDE tests included
- Element selectors documented
- Test cases for all major flows

### Test Coverage
- ✅ Authentication (login, register, logout)
- ✅ Product browsing and search
- ✅ Cart operations
- ✅ Checkout process
- ✅ Form validations
- ✅ Edge cases

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-orange: #FF9900;      /* Amazon signature orange */
--primary-hover: #FF8F00;       /* Hover state */
--yellow-button: #FFD814;       /* Add to Cart button */
--orange-button: #FFA41C;       /* Buy Now button */

/* Navigation */
--nav-background: #232F3E;      /* Dark blue-gray */
--nav-secondary: #37475A;       /* Lighter blue-gray */

/* Status Colors */
--success: #067D62;             /* Green */
--error: #C7511F;               /* Red */
--warning: #F08804;             /* Orange */
--price: #B12704;               /* Price red */
```

### Typography
- **Font Family**: System fonts (optimized for performance)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, comfortable line height

### Spacing
- Consistent 4px/8px grid system
- Generous padding for touch targets
- Proper whitespace for readability

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag /dist folder to Netlify
```

### Manual Hosting
```bash
npm run build
# Upload /dist folder to your hosting provider
```

### Environment Variables
No environment variables required for basic functionality. For payment gateway integration, see `PAYMENT_GATEWAY_GUIDE.md`.

## 🔒 Security

- ✅ Input validation on all forms
- ✅ XSS prevention
- ✅ Password masking
- ✅ Secure storage patterns
- ✅ Authentication guards
- ✅ HTTPS ready

## 📈 Performance

- ⚡ Fast initial load
- ⚡ Optimized images (Unsplash CDN)
- ⚡ Code splitting ready
- ⚡ Lazy loading ready
- ⚡ Efficient re-renders (useMemo, useCallback)
- ⚡ Minimal bundle size

## 🤝 Contributing

This is a complete, production-ready project. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Notes

- **Client-Side Only** - No backend required (uses localStorage)
- **Production Ready** - Fully validated and tested
- **Extensible** - Easy to add backend API
- **Well Documented** - Comprehensive guides included
- **Type Safe** - Full TypeScript coverage
- **Accessible** - WCAG compliant components

## 🎯 Future Enhancements

Potential additions (see `PAYMENT_GATEWAY_GUIDE.md` for payment integration):

- [ ] Backend API integration
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Order tracking
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] PWA support

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the code comments
3. Test with provided examples
4. Verify all dependencies are installed

## 📄 License

This project is for educational and portfolio purposes. Feel free to use it as a learning resource or portfolio project.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS
- **shadcn/ui** - For beautiful components
- **Unsplash** - For high-quality product images
- **Amazon** - For design inspiration

## 🎯 Project Highlights

### What This Clone Can Do

✅ **Complete Shopping Experience**
- Browse 90+ products with accurate images
- Search across multiple fields instantly
- Filter by category, price, and rating
- View detailed product information
- Add items to cart with stock validation
- Complete checkout with address validation
- View order history

✅ **Production-Ready Quality**
- 100% TypeScript for type safety
- Comprehensive error handling
- Real-time form validation
- Loading states for all actions
- Toast notifications for feedback
- Mobile-responsive design
- Optimized performance

✅ **Amazon-Authentic Design**
- Exact color scheme (#FF9900 orange, #232F3E nav)
- Pixel-perfect layouts
- Smooth animations and transitions
- Hover effects on all interactive elements
- Professional typography and spacing
- Consistent design system

✅ **Developer-Friendly**
- Clean, modular code structure
- Reusable components
- Context API for state management
- Custom hooks
- Comprehensive documentation
- Easy to extend and customize

### Use Cases

- 🎓 **Learning Project** - Study modern React patterns
- 💼 **Portfolio Piece** - Showcase your skills
- 🧪 **Testing Platform** - Practice automation testing
- 🚀 **Startup Base** - Foundation for real e-commerce
- 📚 **Teaching Tool** - Demonstrate web development

---

<div align="center">

### 🌟 **This is a Complete, Production-Ready E-Commerce Platform** 🌟

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

⭐ **Star this repo if you found it helpful!** ⭐

**Made with passion for learning and sharing knowledge**

</div>
