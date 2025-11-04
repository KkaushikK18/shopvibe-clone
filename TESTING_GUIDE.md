# ShopVibe - Selenium IDE Testing Guide

## Overview
This Amazon clone is ready for Selenium IDE testing with all required features implemented.

## Features Implemented

### 1. Authentication
- **Login**: `/login` - Email and password authentication
- **Logout**: Available in user dropdown menu (top right)
- **Register**: `/register` - Create new account

### 2. Product Search
- Search bar in navbar (works on all pages)
- Real-time search filtering
- Search results page with filters

### 3. Shopping Cart
- **Add to Cart**: Available on product cards and product detail pages
- **View Cart**: `/cart` - Shows all cart items
- **Update Quantity**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart

### 4. Product Browsing
- Home page with featured products
- Products page with category filters
- Product detail pages

## Test Credentials

For Selenium IDE testing, you can use any email/password combination:
- **Email**: Any valid email format (e.g., `test@example.com`)
- **Password**: Minimum 6 characters (e.g., `password123`)

The authentication is client-side only (no backend), so any valid credentials will work.

## Selenium IDE Test Cases

### Test Case 1: Login
1. Navigate to `http://localhost:5173/login`
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Sign In" button
5. Verify redirect to home page
6. Verify user name appears in navbar

### Test Case 2: Logout
1. Ensure user is logged in
2. Click on user dropdown in navbar (top right)
3. Click "Sign Out"
4. Verify redirect to home page
5. Verify "Hello, Sign in" appears in navbar

### Test Case 3: Add to Cart 1
1. Navigate to home page
2. Click on first product card
3. Click "Add to Cart" button
4. Verify success toast message
5. Verify cart count increases in navbar

### Test Case 4: Add to Cart 2
1. Navigate to `/products`
2. Click on a different product
3. Click "Add to Cart" button
4. Verify success toast message
5. Verify cart count increases

### Test Case 5: Search
1. Click on search bar in navbar
2. Type "headphones"
3. Press Enter or click search button
4. Verify redirect to products page with search results
5. Verify search results contain "headphones"

## Element Selectors for Selenium

### Login Page
- Email input: `#email`
- Password input: `#password`
- Submit button: `button[type="submit"]`

### Navbar
- Search input: `input[type="search"]`
- Search button: `button[type="submit"]` (in search form)
- Cart link: `a[href="/cart"]`
- User dropdown: Look for button with User icon

### Product Cards
- Add to Cart button: Look for "Add to Cart" text
- Product title: Link within product card

### Cart Page
- Quantity controls: Buttons with Plus/Minus icons
- Remove button: Button with Trash icon
- Checkout button: "Proceed to Checkout" text

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at http://localhost:5173
```

## Notes for Testing

1. **Cart Persistence**: Cart data is stored in React state (not persisted on refresh)
2. **User Persistence**: User data is stored in localStorage (persists on refresh)
3. **No Backend**: All functionality is client-side only
4. **Test Data**: Products are hardcoded in `src/data/products.ts`

## Sample Test Products

- Premium Wireless Headphones - $149.99
- Smart Fitness Tracker Watch - $79.99
- Professional DSLR Camera - $899.99
- Minimalist Leather Backpack - $89.99
- 4K Ultra HD Smart TV - $599.99
- Running Shoes - $79.99

## Troubleshooting

If elements are not found:
1. Use browser DevTools to inspect elements
2. Use more specific CSS selectors or XPath
3. Add explicit waits for dynamic content
4. Check that the page has fully loaded before interacting
