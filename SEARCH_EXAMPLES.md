# Search Examples for Testing

## Quick Search Tests

### Test 1: Search for iPhone
```
Search Query: "iPhone"
Expected Results: 2 products
- Apple iPhone 15 Pro Max 256GB - Natural Titanium
- Apple iPhone 14 128GB - Midnight
```

### Test 2: Search for Apple
```
Search Query: "Apple"
Expected Results: 7 products
- iPhone 15 Pro Max
- iPhone 14
- MacBook Air 13-inch M2
- AirPods Pro (2nd Generation)
- iPad Pro 11-inch M2
- Apple Watch Series 9
```

### Test 3: Search for Samsung
```
Search Query: "Samsung"
Expected Results: 2 products
- Samsung Galaxy S24 Ultra 512GB
- Samsung Galaxy Tab S9 11-inch
```

### Test 4: Search for Headphones
```
Search Query: "headphones"
Expected Results: 4 products
- Premium Wireless Headphones
- Sony WH-1000XM5
- Bose QuietComfort 45
```

### Test 5: Search for Watch
```
Search Query: "watch"
Expected Results: 2 products
- Apple Watch Series 9
- Smart Fitness Tracker Watch
```

### Test 6: Search for Camera
```
Search Query: "camera"
Expected Results: 3 products
- Professional DSLR Camera
- Canon EOS R6 Mark II
- GoPro HERO12 Black
```

### Test 7: Search for Gaming
```
Search Query: "gaming"
Expected Results: 3 products
- Wireless Gaming Mouse
- PlayStation 5 Console
- Nintendo Switch OLED
```

### Test 8: Search for Shoes
```
Search Query: "shoes"
Expected Results: 3 products
- Running Shoes - Lightweight
- Nike Air Max 270
- Adidas Ultraboost 22
```

### Test 9: Search for Book
```
Search Query: "book"
Expected Results: 2 products
- Bestselling Mystery Novel
- The Lord of the Rings Boxed Set
```

### Test 10: Search for Wireless
```
Search Query: "wireless"
Expected Results: 5 products
- Premium Wireless Headphones
- Sony WH-1000XM5 Wireless
- Wireless Gaming Mouse
- Bose QuietComfort 45 Wireless
```

## Case Insensitive Search

All searches are case-insensitive:
- "iphone" = "iPhone" = "IPHONE"
- "apple" = "Apple" = "APPLE"
- "samsung" = "Samsung" = "SAMSUNG"

## Partial Match Search

Search works with partial words:
- "phone" → Finds iPhone, headphones
- "mac" → Finds MacBook
- "pad" → Finds iPad, AirPods
- "pro" → Finds iPhone Pro, iPad Pro, AirPods Pro, etc.

## Brand Search

Search by brand name:
- "Apple" → 7 products
- "Samsung" → 2 products
- "Sony" → 2 products
- "Amazon" → 3 products (Kindle, Echo, Fire TV)
- "Nike" → 1 product
- "Adidas" → 1 product
- "Canon" → 1 product
- "GoPro" → 1 product
- "Bose" → 1 product
- "Dyson" → 1 product

## Category Search

Search by category:
- "Electronics" → 24 products
- "Fashion" → 2 products
- "Sports" → 5 products
- "Home" → 5 products
- "Books" → 2 products

## Empty Search

```
Search Query: "" (empty)
Expected Results: All 36 products
```

## No Results Search

```
Search Query: "xyz123"
Expected Results: 0 products
Message: "No products found matching your filters"
```

## Selenium IDE Commands

### Basic Search Test
```
open | /
click | css=input[type="search"]
type | css=input[type="search"] | iPhone
click | css=form button[type="submit"]
pause | 1000
assertText | css=h1 | Search results for "iPhone"
assertElementPresent | xpath=//*[contains(text(), "iPhone 15")]
```

### Verify Result Count
```
open | /
type | css=input[type="search"] | Apple
click | css=form button[type="submit"]
pause | 1000
assertText | css=.text-muted-foreground | 7 results
```

### Multiple Searches
```
# Search 1
type | css=input[type="search"] | iPhone
click | css=form button[type="submit"]
pause | 1000

# Search 2
type | css=input[type="search"] | Samsung
click | css=form button[type="submit"]
pause | 1000

# Search 3
type | css=input[type="search"] | headphones
click | css=form button[type="submit"]
pause | 1000
```

## Tips for Testing

1. **Wait for Results**: Add `pause | 1000` after search submission
2. **Check URL**: Verify URL contains `?search=query`
3. **Verify Title**: Check page title shows search query
4. **Count Results**: Verify result count matches expected
5. **Check Products**: Verify specific products appear in results

## Common Test Scenarios

### Scenario 1: User searches for iPhone and adds to cart
```
1. Search for "iPhone"
2. Click on "iPhone 15 Pro Max"
3. Click "Add to Cart"
4. Verify cart count increases
```

### Scenario 2: User searches and filters
```
1. Search for "Apple"
2. Filter by price range $500-$1000
3. Verify filtered results
```

### Scenario 3: User searches from different pages
```
1. From home page: Search "iPhone"
2. From products page: Search "Samsung"
3. From cart page: Search "headphones"
4. All should work correctly
```

## Expected Behavior

✅ Search is instant (no loading spinner needed)
✅ Results update immediately
✅ URL updates with search parameter
✅ Page title shows search query
✅ Result count displays correctly
✅ "No results" message for invalid searches
✅ Search works from any page
✅ Search bar retains query after search
