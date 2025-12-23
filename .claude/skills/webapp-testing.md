# Web App Testing with Playwright

Toolkit for interacting with and testing web applications using Playwright browser automation.

## When to Use

Use this skill when:
- Testing frontend UI functionality
- Debugging UI behavior visually
- Capturing browser screenshots
- Viewing browser console logs
- Testing responsive design across devices
- Validating user flows (login, checkout, forms)

## Available Browser Tools

The following MCP browser tools are available:

### Navigation & Page Control
- `browser_navigate` - Navigate to a URL
- `browser_navigate_back` - Go back to previous page
- `browser_snapshot` - Capture accessibility snapshot (better than screenshot for actions)
- `browser_take_screenshot` - Take visual screenshot
- `browser_close` - Close the browser
- `browser_resize` - Resize browser window

### Interaction
- `browser_click` - Click on elements
- `browser_type` - Type text into fields
- `browser_hover` - Hover over elements
- `browser_press_key` - Press keyboard keys
- `browser_drag` - Drag and drop between elements
- `browser_select_option` - Select dropdown options
- `browser_fill_form` - Fill multiple form fields at once
- `browser_file_upload` - Upload files

### Debugging
- `browser_console_messages` - View console logs and errors
- `browser_network_requests` - View all network requests
- `browser_evaluate` - Execute JavaScript in page context

### Tab Management
- `browser_tabs` - List, create, close, or select tabs
- `browser_wait_for` - Wait for text, element, or time
- `browser_handle_dialog` - Handle alert/confirm dialogs

## Testing Workflows

### 1. Visual Testing - Check UI Appearance

```
1. Navigate to the page
2. Take screenshots at different breakpoints
3. Compare with expected design
```

Example flow:
```
→ browser_navigate to http://localhost:3000
→ browser_resize to {width: 375, height: 667} (iPhone SE)
→ browser_take_screenshot
→ browser_resize to {width: 1440, height: 900} (Desktop)
→ browser_take_screenshot
```

### 2. Functional Testing - Test User Flows

**Login Flow:**
```
→ browser_navigate to /login
→ browser_snapshot (get current state)
→ browser_type email into email field
→ browser_type password into password field
→ browser_click "Sign In" button
→ browser_wait_for text "Dashboard"
→ browser_snapshot (verify logged in state)
```

**Add to Cart Flow:**
```
→ browser_navigate to /products
→ browser_click on product card
→ browser_click "Add to Cart" button
→ browser_wait_for cart count update
→ browser_click cart icon
→ browser_snapshot (verify cart contents)
```

### 3. Form Validation Testing

```
→ browser_navigate to /checkout
→ browser_fill_form with invalid data
→ browser_click submit
→ browser_snapshot (capture validation errors)
→ browser_console_messages (check for JS errors)
```

### 4. Responsive Design Testing

Test across device sizes:
```
Mobile S:  320 x 568
Mobile M:  375 x 667  (iPhone SE)
Mobile L:  425 x 812  (iPhone X)
Tablet:    768 x 1024 (iPad)
Laptop:   1024 x 768
Desktop:  1440 x 900
```

### 5. Console Error Checking

```
→ browser_navigate to page
→ browser_console_messages with onlyErrors: true
→ Review any JavaScript errors
```

### 6. Network Request Debugging

```
→ browser_navigate to page
→ browser_network_requests
→ Check for failed requests, slow responses
```

## Common Test Scenarios for ZenSkin

### Home Page Load
```
1. Navigate to https://zenskin.in (or localhost:3000)
2. browser_snapshot - verify hero, navigation, featured products
3. browser_console_messages - check for errors
4. Test responsive at mobile/tablet/desktop
```

### Product Browsing
```
1. Navigate to /products
2. browser_click on category filter
3. browser_wait_for products to update
4. browser_click on a product card
5. Verify product detail page loads
```

### Shopping Cart
```
1. Navigate to product page
2. browser_click "Add to Cart"
3. browser_wait_for cart badge to update
4. Navigate to /cart
5. browser_snapshot - verify cart items
```

### Checkout Flow
```
1. Add items to cart
2. Navigate to /checkout
3. browser_fill_form with shipping details
4. browser_click "Proceed to Payment"
5. Verify Razorpay modal appears
```

### Authentication
```
1. Navigate to /login
2. browser_type credentials
3. browser_click submit
4. browser_wait_for redirect to dashboard
5. browser_snapshot - verify logged in state
```

## Best Practices

1. **Use browser_snapshot over screenshots** - Snapshots provide element refs for clicking
2. **Wait for elements** - Use browser_wait_for before interactions
3. **Check console errors** - Always verify no JS errors
4. **Test mobile first** - Start with smallest viewport
5. **Test both success and error states** - Validate error messages appear

## Debugging Tips

### Page Not Loading
```
→ browser_network_requests - check for failed resources
→ browser_console_messages - check for JS errors
```

### Element Not Found
```
→ browser_snapshot - verify element exists in DOM
→ browser_wait_for text/element before clicking
```

### Form Not Submitting
```
→ browser_console_messages - check validation errors
→ browser_network_requests - check if API call was made
```

## Device Presets

For `browser_resize`:

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375 | 667 |
| iPhone 14 | 390 | 844 |
| iPhone 14 Pro Max | 430 | 932 |
| Pixel 5 | 393 | 851 |
| iPad Mini | 768 | 1024 |
| iPad Pro | 1024 | 1366 |
| Laptop | 1366 | 768 |
| Desktop | 1920 | 1080 |
