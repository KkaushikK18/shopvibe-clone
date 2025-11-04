# Selenium IDE Selectors Reference

## Quick Test URLs
- Home: `http://localhost:5173/`
- Login: `http://localhost:5173/login`
- Register: `http://localhost:5173/register`
- Products: `http://localhost:5173/products`
- Cart: `http://localhost:5173/cart`

## Login Page Selectors

### Input Fields
```
Email: id=email
Password: id=password
```

### Buttons
```
Sign In: css=button[type="submit"]
Create Account Link: linkText=Create your ShopVibe account
```

## Register Page Selectors

### Input Fields
```
Name: id=name
Email: id=email
Password: id=password
Confirm Password: id=confirmPassword
```

### Buttons
```
Create Account: css=button[type="submit"]
Sign In Link: linkText=Sign in
```

## Navbar Selectors

### Search
```
Search Input: css=input[type="search"]
Search Button: css=form button[type="submit"]
```

### Navigation
```
Logo/Home: linkText=ShopVibe
Cart Link: css=a[href="/cart"]
Login Link: linkText=Hello, Sign in (when logged out)
User Dropdown: css=button (contains user name when logged in)
```

### User Dropdown Menu (when logged in)
```
Sign Out: linkText=Sign Out
```

## Product Card Selectors

### On Home/Products Pages
```
Product Card: css=.group (multiple)
Product Title: css=h3
Product Price: css=.text-price
Add to Cart Button: xpath=//button[contains(text(), "Add to Cart")]
Product Link: css=a[href^="/product/"]
```

## Product Detail Page Selectors

### Product Info
```
Product Title: css=h1
Price: css=.text-price
Quantity Selector: css=select
```

### Buttons
```
Add to Cart: xpath=//button[contains(text(), "Add to Cart")]
Buy Now: xpath=//button[contains(text(), "Buy Now")]
```

## Cart Page Selectors

### Cart Items
```
Cart Item: css=.flex.gap-4 (multiple)
Quantity Increase: xpath=//button[contains(@class, "Plus")]
Quantity Decrease: xpath=//button[contains(@class, "Minus")]
Remove Item: xpath=//button[contains(@class, "Trash")]
```

### Cart Summary
```
Subtotal: xpath=//*[contains(text(), "Subtotal")]
Total: xpath=//*[contains(text(), "Total")]
Checkout Button: xpath=//button[contains(text(), "Proceed to Checkout")]
Continue Shopping: linkText=Continue Shopping
```

## Checkout Page Selectors

### Shipping Form
```
Full Name: id=name
Address: id=address
City: id=city
ZIP Code: id=zip
Phone: id=phone
```

### Payment
```
Card Number: id=cardNumber
Expiry: id=expiry
CVV: id=cvv
```

### Buttons
```
Place Order: css=button[type="submit"]
```

## Sample Selenium IDE Test Commands

### Login Test
```
open | /login
type | id=email | test@example.com
type | id=password | password123
click | css=button[type="submit"]
waitForElementPresent | xpath=//*[contains(text(), "test")]
```

### Search Test
```
open | /
click | css=input[type="search"]
type | css=input[type="search"] | headphones
click | css=form button[type="submit"]
waitForElementPresent | xpath=//*[contains(text(), "Search results")]
```

### Add to Cart Test
```
open | /
click | xpath=(//button[contains(text(), "Add to Cart")])[1]
waitForElementPresent | xpath=//*[contains(text(), "Added to cart")]
assertText | css=.bg-primary span | 1
```

### Logout Test
```
click | css=button (user dropdown)
waitForElementVisible | linkText=Sign Out
click | linkText=Sign Out
waitForElementPresent | linkText=Hello, Sign in
```

## Tips for Selenium IDE

1. **Wait Commands**: Use `waitForElementPresent` or `waitForElementVisible` before interacting with elements
2. **Toast Messages**: Look for text "Added to cart", "Login successful", etc.
3. **Cart Count**: Check the badge on cart icon for item count
4. **Dynamic Content**: Add 1-2 second pauses after navigation
5. **XPath vs CSS**: Use XPath for text-based selection, CSS for attributes

## Common Issues & Solutions

### Element Not Found
- Add `pause | 1000` before the command
- Use `waitForElementPresent` first
- Check if element is in viewport (scroll if needed)

### Click Not Working
- Try `clickAt` with coordinates
- Ensure element is not covered by another element
- Wait for page to fully load

### Form Submission
- Use `submit` on form element instead of clicking button
- Or use `sendKeys | id=password | ${KEY_ENTER}`
