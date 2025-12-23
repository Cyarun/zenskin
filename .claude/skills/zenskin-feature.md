# ZenSkin Feature Development

Guide for implementing new features in the ZenSkin D2C platform.

## Usage

Use this skill when implementing new features for:
- E-commerce functionality
- User authentication
- Product management
- Order processing
- Mobile app screens

## Instructions

### 1. Check the Roadmap

Before starting, verify the feature is in the roadmap:
```
@.agent-os/product/roadmap.md
```

### 2. Create a Spec (if complex)

For features taking more than 1 day:
```
/create-spec
```

### 3. Implementation Pattern

#### Database Schema (if needed)
```prisma
// packages/db/prisma/schema.prisma

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  price       Decimal  @db.Decimal(10, 2)
  images      String[]
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### tRPC Router
```typescript
// packages/api/src/routers/product.ts

import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const productRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({
      categoryId: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: { categoryId: input.categoryId },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      })

      let nextCursor: string | undefined
      if (products.length > input.limit) {
        const nextItem = products.pop()
        nextCursor = nextItem?.id
      }

      return { products, nextCursor }
    }),
})
```

#### Shared UI Component
```typescript
// packages/ui/src/components/ProductCard/index.tsx

import { View, Text, Image, Pressable } from 'react-native'
import { cn } from '../../utils/cn'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  onPress?: () => void
  className?: string
}

export function ProductCard({ product, onPress, className }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'bg-white rounded-xl overflow-hidden shadow-sm',
        'active:scale-[0.98] transition-transform',
        className
      )}
    >
      <Image
        source={{ uri: product.image }}
        className="w-full aspect-square"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="font-medium text-gray-900">{product.name}</Text>
        <Text className="text-lg font-bold text-primary-600">
          ₹{product.price.toLocaleString('en-IN')}
        </Text>
      </View>
    </Pressable>
  )
}
```

#### Web Page
```typescript
// apps/web/app/products/page.tsx

import { ProductCard } from '@zenskin/ui'
import { api } from '@/lib/api'

export default async function ProductsPage() {
  const { products } = await api.product.list({ limit: 20 })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  )
}
```

#### Mobile Screen
```typescript
// apps/mobile/app/(tabs)/products.tsx

import { FlatList } from 'react-native'
import { ProductCard } from '@zenskin/ui'
import { api } from '@/lib/api'

export default function ProductsScreen() {
  const { data, isLoading } = api.product.list.useQuery({ limit: 20 })

  return (
    <FlatList
      data={data?.products}
      numColumns={2}
      contentContainerClassName="p-4"
      columnWrapperClassName="gap-4"
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          className="flex-1"
        />
      )}
    />
  )
}
```

### 4. Testing

```typescript
// packages/ui/src/components/ProductCard/ProductCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react-native'
import { ProductCard } from '.'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Gut Health Supplement',
    price: 1499,
    image: 'https://example.com/image.jpg',
  }

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Gut Health Supplement')).toBeTruthy()
    expect(screen.getByText('₹1,499')).toBeTruthy()
  })

  it('calls onPress when tapped', () => {
    const onPress = jest.fn()
    render(<ProductCard product={mockProduct} onPress={onPress} />)

    fireEvent.press(screen.getByText('Gut Health Supplement'))
    expect(onPress).toHaveBeenCalled()
  })
})
```

### 5. Update Roadmap

After completion, mark the feature as done:
```markdown
- [x] Feature Name - Description `Effort`
```
