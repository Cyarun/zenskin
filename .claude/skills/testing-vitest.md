# Testing with Vitest

Comprehensive testing strategies using Vitest, Testing Library, and Playwright.

## When to Use

Use this skill when:
- Writing unit tests for utilities and hooks
- Testing React/React Native components
- Setting up test infrastructure
- Implementing TDD/BDD workflows
- Writing end-to-end tests

## Vitest Configuration

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', '**/*.test.{ts,tsx}', '**/types/**'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
```

### Test Setup
```typescript
// test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  }),
}))
```

## Unit Testing

### Testing Utilities
```typescript
// lib/utils/formatPrice.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice, formatPriceINR } from './formatPrice'

describe('formatPrice', () => {
  it('formats positive numbers with 2 decimal places', () => {
    expect(formatPrice(1499)).toBe('1499.00')
    expect(formatPrice(99.9)).toBe('99.90')
  })

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('0.00')
  })

  it('handles negative numbers', () => {
    expect(formatPrice(-100)).toBe('-100.00')
  })
})

describe('formatPriceINR', () => {
  it('formats price in Indian Rupee format', () => {
    expect(formatPriceINR(1499)).toBe('₹1,499')
    expect(formatPriceINR(100000)).toBe('₹1,00,000')
  })

  it('includes decimals when specified', () => {
    expect(formatPriceINR(1499.5, { decimals: true })).toBe('₹1,499.50')
  })
})
```

### Testing Hooks
```typescript
// hooks/useCart.test.ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/stores/cart'

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [] })
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Gut Health Supplement',
        price: 1499,
        image: '/image.jpg',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('increments quantity for existing item', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Product', price: 100, image: '' })
      result.current.addItem({ id: '1', name: 'Product', price: 100, image: '' })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Product', price: 100, image: '' })
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Product 1', price: 100, image: '' })
      result.current.addItem({ id: '2', name: 'Product 2', price: 200, image: '' })
      result.current.addItem({ id: '1', name: 'Product 1', price: 100, image: '' })
    })

    expect(result.current.total()).toBe(400) // 100*2 + 200*1
  })
})
```

## Component Testing

### Testing with React Testing Library
```typescript
// components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductCard } from './ProductCard'

const mockProduct = {
  id: '1',
  name: 'Gut Health Supplement',
  slug: 'gut-health-supplement',
  price: 1499,
  salePrice: 1299,
  image: '/product.jpg',
  category: { name: 'Supplements', slug: 'supplements' },
}

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Gut Health Supplement')).toBeInTheDocument()
    expect(screen.getByText('₹1,299')).toBeInTheDocument()
    expect(screen.getByText('Supplements')).toBeInTheDocument()
  })

  it('shows original price with strikethrough when on sale', () => {
    render(<ProductCard product={mockProduct} />)

    const originalPrice = screen.getByText('₹1,499')
    expect(originalPrice).toHaveClass('line-through')
  })

  it('calls onAddToCart when button is clicked', () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('navigates to product page on click', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/gut-health-supplement')
  })

  it('displays sold out badge when out of stock', () => {
    render(<ProductCard product={{ ...mockProduct, inStock: false }} />)

    expect(screen.getByText('Sold Out')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })
})
```

### Testing Forms
```typescript
// components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('shows validation errors for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'short')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('disables submit button while loading', async () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />)

    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
  })
})
```

### Testing with MSW (Mock Service Worker)
```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({
      products: [
        { id: '1', name: 'Product 1', price: 100 },
        { id: '2', name: 'Product 2', price: 200 },
      ],
    })
  }),

  http.post('/api/cart', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ success: true, cartId: '123' })
  }),

  http.get('/api/products/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Product Detail',
      price: 1499,
    })
  }),
]

// test/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// test/setup.ts
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Async Testing

```typescript
// components/ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductList } from './ProductList'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('ProductList', () => {
  it('shows loading state initially', () => {
    render(<ProductList />, { wrapper: createWrapper() })

    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument()
  })

  it('renders products after loading', async () => {
    render(<ProductList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })
  })

  it('shows error state on failure', async () => {
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.error()
      })
    )

    render(<ProductList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    })
  })
})
```

## E2E Testing with Playwright

### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E Test Example
```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('complete purchase flow', async ({ page }) => {
    // Browse products
    await page.goto('/products')
    await page.click('text=Gut Health Supplement')

    // Add to cart
    await page.click('button:has-text("Add to Cart")')
    await expect(page.locator('.cart-count')).toHaveText('1')

    // Go to cart
    await page.click('[data-testid="cart-button"]')
    await expect(page).toHaveURL('/cart')

    // Proceed to checkout
    await page.click('button:has-text("Checkout")')
    await expect(page).toHaveURL('/checkout')

    // Fill shipping info
    await page.fill('[name="address"]', '123 Main St')
    await page.fill('[name="city"]', 'Mumbai')
    await page.fill('[name="pincode"]', '400001')

    // Complete payment (mock)
    await page.click('button:has-text("Pay Now")')

    // Verify order confirmation
    await expect(page).toHaveURL(/\/orders\//)
    await expect(page.locator('h1')).toContainText('Order Confirmed')
  })

  test('shows error for invalid address', async ({ page }) => {
    await page.goto('/checkout')
    await page.click('button:has-text("Pay Now")')

    await expect(page.locator('.error-message')).toContainText('Address is required')
  })
})
```

## Test Patterns

### AAA Pattern (Arrange, Act, Assert)
```typescript
it('adds product to cart', () => {
  // Arrange
  const product = { id: '1', name: 'Test', price: 100, image: '' }
  const { result } = renderHook(() => useCartStore())

  // Act
  act(() => {
    result.current.addItem(product)
  })

  // Assert
  expect(result.current.items).toContainEqual(expect.objectContaining({ id: '1' }))
})
```

### Test Data Builders
```typescript
// test/factories/product.ts
export function createProduct(overrides?: Partial<Product>): Product {
  return {
    id: crypto.randomUUID(),
    name: 'Test Product',
    slug: 'test-product',
    price: 1499,
    description: 'Test description',
    images: ['/test.jpg'],
    inStock: true,
    ...overrides,
  }
}

// Usage
const product = createProduct({ price: 999, inStock: false })
```
