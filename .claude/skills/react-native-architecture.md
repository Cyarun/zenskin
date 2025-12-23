# React Native Architecture

Build production React Native apps with Expo, navigation, native modules, offline sync, and cross-platform patterns.

## When to Use

Use this skill when:
- Developing mobile apps with React Native
- Implementing native integrations
- Architecting React Native projects
- Setting up Expo projects
- Building cross-platform features

## Project Structure

```
apps/mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx      # Home tab
│   │   ├── products.tsx   # Products tab
│   │   ├── cart.tsx       # Cart tab
│   │   └── profile.tsx    # Profile tab
│   ├── (auth)/            # Auth flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── product/
│   │   └── [id].tsx       # Product detail
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx
├── components/            # Mobile-specific components
│   ├── ui/               # Basic UI components
│   └── features/         # Feature components
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── constants/            # App constants
└── assets/              # Images, fonts
```

## Expo Router Patterns

### Root Layout
```typescript
// app/_layout.tsx
import { Stack } from 'expo-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen
          name="product/[id]"
          options={{
            presentation: 'modal',
            headerShown: true,
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}
```

### Tab Navigation
```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
```

## NativeWind (TailwindCSS) Setup

### Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
    },
  },
}
```

### Usage
```typescript
import { View, Text, Pressable } from 'react-native'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Pressable className="bg-white rounded-xl shadow-sm overflow-hidden active:scale-[0.98]">
      <Image
        source={{ uri: product.image }}
        className="w-full aspect-square"
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

## State Management (Zustand)

### Store Setup
```typescript
// stores/cart.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
```

## API Integration (TanStack Query + tRPC)

### Query Client
```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
```

### tRPC Client
```typescript
// lib/api.ts
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@zenskin/api'

export const api = createTRPCReact<AppRouter>()
```

### Usage in Components
```typescript
// app/(tabs)/products.tsx
import { FlatList, RefreshControl } from 'react-native'
import { api } from '@/lib/api'
import { ProductCard } from '@/components/ProductCard'

export default function ProductsScreen() {
  const { data, isLoading, refetch, isRefetching } = api.product.list.useQuery({
    limit: 20,
  })

  if (isLoading) {
    return <ProductsSkeleton />
  }

  return (
    <FlatList
      data={data?.products}
      numColumns={2}
      contentContainerClassName="p-4"
      columnWrapperClassName="gap-4"
      ItemSeparatorComponent={() => <View className="h-4" />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      renderItem={({ item }) => <ProductCard product={item} className="flex-1" />}
      keyExtractor={(item) => item.id}
    />
  )
}
```

## Push Notifications

### Setup
```typescript
// lib/notifications.ts
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device')
    return null
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return null
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-project-id',
  })

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    })
  }

  return token.data
}
```

## Offline Support

### NetInfo Hook
```typescript
// hooks/useNetworkStatus.ts
import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true)
    })

    return () => unsubscribe()
  }, [])

  return { isConnected }
}
```

### Offline Queue
```typescript
// lib/offline-queue.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

interface QueuedAction {
  id: string
  type: string
  payload: unknown
  timestamp: number
}

const QUEUE_KEY = 'offline-queue'

export async function queueAction(action: Omit<QueuedAction, 'id' | 'timestamp'>) {
  const queue = await getQueue()
  const newAction: QueuedAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  }
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify([...queue, newAction]))
}

export async function getQueue(): Promise<QueuedAction[]> {
  const stored = await AsyncStorage.getItem(QUEUE_KEY)
  return stored ? JSON.parse(stored) : []
}

export async function processQueue() {
  const queue = await getQueue()
  const processed: string[] = []

  for (const action of queue) {
    try {
      // Process action based on type
      await processAction(action)
      processed.push(action.id)
    } catch (error) {
      console.error('Failed to process action:', action.id, error)
    }
  }

  // Remove processed actions
  const remaining = queue.filter((a) => !processed.includes(a.id))
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining))
}
```

## Performance Optimization

### Image Optimization
```typescript
import { Image } from 'expo-image'

export function OptimizedImage({ uri, ...props }) {
  return (
    <Image
      source={{ uri }}
      contentFit="cover"
      transition={200}
      placeholder={{ blurhash: 'LGF5?xYk^6#M@-5c,1J5@[or[Q6.' }}
      {...props}
    />
  )
}
```

### List Optimization
```typescript
import { FlashList } from '@shopify/flash-list'

export function ProductList({ products }) {
  return (
    <FlashList
      data={products}
      numColumns={2}
      estimatedItemSize={250}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  )
}
```

## App Store Preparation

### app.json Configuration
```json
{
  "expo": {
    "name": "ZenSkin",
    "slug": "zenskin",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "in.zenskin.app",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "in.zenskin.app",
      "versionCode": 1
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#22c55e"
        }
      ]
    ]
  }
}
```

## Common Patterns

### Safe Area Handling
```typescript
import { SafeAreaView } from 'react-native-safe-area-context'

export function Screen({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {children}
    </SafeAreaView>
  )
}
```

### Keyboard Avoiding
```typescript
import { KeyboardAvoidingView, Platform } from 'react-native'

export function FormScreen({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      {children}
    </KeyboardAvoidingView>
  )
}
```
