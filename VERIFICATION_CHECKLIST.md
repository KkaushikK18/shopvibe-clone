# Verification Checklist ✅

Use this checklist to verify all features are working before running Selenium tests.

## 🔧 Setup Verification

- [ ] Node.js installed (check: `node --version`)
- [ ] Dependencies installed (run: `npm install`)
- [ ] Dev server starts (run: `npm run dev`)
- [ ] Application opens at `http://localhost:5173`
- [ ] No console errors in browser DevTools

## 🔐 Authentication Tests

### Login
- [ ] Navigate to `/login`
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `password123`
- [ ] Click "Sign In"
- [ ] Success toast appears
- [ ] Redirected to home page
- [ ] User name "test" appears in navbar

### Register
- [ ] Navigate to `/register`
- [ ] Fill in all fields
- [ ] Click "Create your ShopVibe account"
- [ ] Success toast appears
- [ ] Redirected to home page
- [ ] User name appears in navbar

### Logout
- [ ] Click on user name in navbar (top right)
- [ ] Dropdown menu appears
- [ ] Click "Sign Out"
- [ ] Success toast appears
- [ ] "Hello, Sign in" appears in navbar

## 🔍 Search Tests

### Search from Home
- [ ] On home page
- [ ] Click search bar
- [ ] Type "headphones"
- [ ] Press Enter or click search button
- [ ] Redirected to `/products?search=headphones`
- [ ] Search results show "headphones" product
- [ ] Page title shows "Search results for 'headphones'"

### Search from Products Page
- [ ] Navigate to `/products`
- [ ] Use search bar
- [ ] Type "tv"
- [ ] Submit search
- [ ] Results show TV product

### Empty Search
- [ ] Try searching with empty query
- [ ] Should show all products

## 🛒 Cart Tests

### Add to Cart from Home
- [ ] On home page
- [ ] Click "Add to Cart" on first product
- [ ] Success toast appears
- [ ] Cart counter shows "1"
- [ ] Click cart icon
- [ ] Product appears in cart

### Add to Cart from Products Page
- [ ] Navigate to `/products`
- [ ] Click "Add to Cart" on any product
- [ ] Success toast appears
- [ ] Cart counter increases

### Add to Cart from Product Detail
- [ ] Click on any product card
- [ ] On product detail page
- [ ] Select quantity (e.g., 2)
- [ ] Click "Add to Cart"
- [ ] Success toast appears
- [ ] Cart counter updates

### Cart Management
- [ ] Navigate to `/cart`
- [ ] See all added items
- [ ] Click "+" to increase quantity
- [ ] Click "-" to decrease quantity
- [ ] Click trash icon to remove item
- [ ] Success toast for each action
- [ ] Prices update correctly

### Empty Cart
- [ ] Remove all items from cart
- [ ] See "Your cart is empty" message
- [ ] "Continue Shopping" button works

## 🛍️ Product Browsing

### Home Page
- [ ] Featured products display
- [ ] "Deals of the Day" section
- [ ] "Top Electronics" section
- [ ] Product cards show images
- [ ] Prices display correctly
- [ ] Ratings show stars

### Products Page
- [ ] All products display
- [ ] Category filters work
- [ ] Price range slider works
- [ ] Rating filter works
- [ ] Product count updates

### Product Detail
- [ ] Click any product
- [ ] Product detail page loads
- [ ] Image displays
- [ ] Price shows
- [ ] Features list displays
- [ ] "Add to Cart" button works
- [ ] "Buy Now" button works (adds to cart and goes to cart page)

## 💳 Checkout

### Checkout Flow
- [ ] Add items to cart
- [ ] Click "Proceed to Checkout"
- [ ] Checkout page loads
- [ ] Shipping form displays
- [ ] Payment options show
- [ ] Order summary correct
- [ ] Fill all required fields
- [ ] Click "Place Order"
- [ ] Success toast appears
- [ ] Cart clears
- [ ] Redirected to home

## 🎨 UI/UX Verification

### Navbar
- [ ] Logo links to home
- [ ] Search bar visible
- [ ] Cart icon shows count
- [ ] User menu works
- [ ] Category links work
- [ ] Responsive on mobile

### Responsive Design
- [ ] Resize browser window
- [ ] Mobile menu appears on small screens
- [ ] Product grid adjusts
- [ ] Forms remain usable

### Visual Feedback
- [ ] Buttons have hover effects
- [ ] Links change color on hover
- [ ] Toast notifications appear
- [ ] Loading states (if any)

## 🧪 Selenium IDE Preparation

### Element Verification
- [ ] Login email input has `id="email"`
- [ ] Login password input has `id="password"`
- [ ] Search input has `type="search"`
- [ ] "Add to Cart" buttons have correct text
- [ ] Cart link has `href="/cart"`

### Test Data
- [ ] At least 12 products available
- [ ] Products have different categories
- [ ] Search returns results
- [ ] Multiple products can be added to cart

### Browser Console
- [ ] No JavaScript errors
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] React DevTools shows components

## 📋 Documentation Verification

- [ ] `README.md` - Main documentation
- [ ] `QUICK_START.md` - Quick start guide
- [ ] `TESTING_GUIDE.md` - Testing instructions
- [ ] `SELENIUM_SELECTORS.md` - Selector reference
- [ ] `selenium-tests.side` - Test suite file
- [ ] `IMPLEMENTATION_SUMMARY.md` - Implementation details

## 🚀 Ready for Selenium Testing

Once all items are checked:

1. ✅ Keep dev server running
2. ✅ Open Selenium IDE
3. ✅ Import `selenium-tests.side`
4. ✅ Run tests
5. ✅ All tests should pass

## 🐛 Common Issues

### Issue: Port 5173 already in use
**Solution:** 
```bash
npx kill-port 5173
npm run dev
```

### Issue: Elements not found in Selenium
**Solution:** 
- Add `pause | 1000` before commands
- Use `waitForElementPresent`
- Check element selectors in browser DevTools

### Issue: Toast notifications not visible
**Solution:** 
- Check browser console for errors
- Verify sonner is working
- Look for toast in bottom-right corner

### Issue: Cart not updating
**Solution:** 
- Check browser console
- Verify CartContext is working
- Refresh page and try again

### Issue: Login not working
**Solution:** 
- Check localStorage in DevTools
- Clear localStorage and try again
- Verify password is at least 6 characters

## ✨ All Done!

If all items are checked, your Amazon clone is ready for Selenium IDE testing!

**Happy Testing!** 🎉
