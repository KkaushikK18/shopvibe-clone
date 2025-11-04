# Quick Start Guide - ShopVibe Amazon Clone

## 🚀 Get Started in 3 Steps

### Step 1: Install & Run
```bash
cd shopvibe-clone
npm install
npm run dev
```

Application will open at: `http://localhost:5173`

### Step 2: Test Manually
1. **Login**: Go to `/login` → Use `test@example.com` / `password123`
2. **Search**: Type "headphones" in search bar → Press Enter
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click cart icon (top right)
5. **Logout**: Click your name → "Sign Out"

### Step 3: Run Selenium Tests
1. Install [Selenium IDE](https://www.selenium.dev/selenium-ide/) browser extension
2. Open Selenium IDE
3. Click "Open an existing project"
4. Select `selenium-tests.side` from this folder
5. Click "Run all tests"

## ✅ All Test Cases

| Test | What It Does | Expected Result |
|------|-------------|-----------------|
| **Login** | Signs in user | User name appears in navbar |
| **Add to Cart 1** | Adds product from home | Cart count increases |
| **Add to Cart 2** | Adds product from products page | Cart count increases |
| **Search** | Searches for "headphones" | Shows search results |
| **Logout** | Signs out user | "Sign in" appears in navbar |

## 🎯 Test Credentials

**Any email/password works!** Examples:
- `test@example.com` / `password123`
- `user@test.com` / `123456`
- `admin@shop.com` / `admin123`

Minimum password length: 6 characters

## 📍 Important URLs

- Home: `http://localhost:5173/`
- Login: `http://localhost:5173/login`
- Register: `http://localhost:5173/register`
- Products: `http://localhost:5173/products`
- Cart: `http://localhost:5173/cart`

## 🔍 Quick Element Selectors

```
Login Email:     id=email
Login Password:  id=password
Search Bar:      css=input[type="search"]
Add to Cart:     xpath=//button[contains(text(), "Add to Cart")]
Cart Link:       css=a[href="/cart"]
Sign Out:        xpath=//*[contains(text(), "Sign Out")]
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies Error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Selenium Can't Find Elements
1. Add `pause | 1000` before commands
2. Use `waitForElementPresent` before clicking
3. Check if page fully loaded

## 📚 More Documentation

- `README.md` - Full project documentation
- `TESTING_GUIDE.md` - Detailed testing instructions
- `SELENIUM_SELECTORS.md` - Complete selector reference

## 🎉 You're Ready!

The application is fully functional and ready for Selenium IDE testing. All features work without any backend setup.

**Happy Testing!** 🧪
