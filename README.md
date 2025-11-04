# Amazon Clone for Selenium Testing

A fully functional Amazon clone built with React, TypeScript, and Tailwind CSS, specifically designed for Selenium IDE testing.

## 🚀 Features Implemented

### ✅ Authentication System
- **Login** - Email/password authentication with validation
- **Logout** - Secure logout with session clearing
- **Register** - New user registration
- **Session Persistence** - User data stored in localStorage

### ✅ Product Features
- **Product Browsing** - Home page with featured products
- **Product Search** - Real-time search with filtering
- **Product Details** - Detailed product pages
- **Category Filtering** - Filter by categories, price, and rating

### ✅ Shopping Cart
- **Add to Cart** - From product cards and detail pages
- **Update Quantity** - Increase/decrease item quantities
- **Remove Items** - Delete items from cart
- **Cart Summary** - Real-time price calculations

### ✅ Checkout Process
- **Shipping Form** - Address and contact information
- **Payment Options** - Card payment and Cash on Delivery
- **Order Summary** - Complete order review

## 📋 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Selenium IDE Testing

### Test Credentials
Use any valid email/password combination:
- **Email**: `test@example.com`
- **Password**: `password123` (minimum 6 characters)

### Pre-built Test Suite
Import `selenium-tests.side` into Selenium IDE for ready-to-run tests:
1. Open Selenium IDE
2. Click "Open an existing project"
3. Select `selenium-tests.side`
4. Run individual tests or the complete suite

### Test Cases Included
1. **Login** - User authentication
2. **Logout** - Session termination
3. **Add to Cart 1** - Add product from home page
4. **Add to Cart 2** - Add product from products page
5. **Search** - Product search functionality

### Documentation
- `TESTING_GUIDE.md` - Comprehensive testing instructions
- `SELENIUM_SELECTORS.md` - Element selectors reference
- `selenium-tests.side` - Importable test suite

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **Lucide React** - Icons

## 🛍️ Product Catalog

**36 Products Available:**
- 24 Electronics (iPhones, MacBooks, iPads, Samsung, Sony, etc.)
- 2 Fashion items
- 5 Home & Kitchen items
- 5 Sports items
- 2 Books

**Popular Search Terms:**
- "iPhone" → 2 results
- "Apple" → 7 results
- "Samsung" → 2 results
- "headphones" → 4 results
- "watch" → 2 results

See `PRODUCT_LIST.md` for complete catalog.

## 📁 Project Structure

```
shopvibe-clone/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx   # Navigation with search
│   │   └── ProductCard.tsx
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   └── Checkout.tsx
│   └── data/
│       └── products.ts  # Product data
├── TESTING_GUIDE.md     # Testing documentation
├── SELENIUM_SELECTORS.md # Selector reference
└── selenium-tests.side  # Test suite
```

## 🎯 Key Features for Testing

### Element IDs for Easy Selection
- Login form: `#email`, `#password`
- Register form: `#name`, `#email`, `#password`, `#confirmPassword`
- Search: `input[type="search"]`
- Cart: `a[href="/cart"]`

### Toast Notifications
- Success messages for all actions
- Easy to verify with Selenium

### Cart Counter
- Real-time cart item count in navbar
- Visual feedback for add to cart actions

### Responsive Design
- Works on all screen sizes
- Mobile-friendly navigation

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Notes

- **No Backend Required** - All functionality is client-side
- **Data Persistence** - User data in localStorage, cart in React state
- **Test Data** - 36 products across 5 categories including iPhones, MacBooks, and more
- **Amazon Branding** - Uses Amazon name and styling throughout
- **Searchable Products** - Search for "iPhone", "Apple", "Samsung", etc.

## 🎨 Styling

The application uses Amazon-inspired color scheme:
- Primary: Orange (#FF9900)
- Navigation: Dark blue (#131921)
- Background: Light gray (#EAEDED)

## 📞 Support

For issues or questions:
1. Check `TESTING_GUIDE.md` for testing help
2. Review `SELENIUM_SELECTORS.md` for element selectors
3. Verify all dependencies are installed

## 📄 License

This project is for educational and testing purposes.

---

**Ready for Selenium IDE Testing!** 🎉

Start the dev server and begin testing with the provided test suite.
