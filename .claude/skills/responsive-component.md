# Responsive Component Generator

Generate cross-platform responsive components for ZenSkin that work on web and mobile.

## Usage

Use this skill when creating UI components that need to work across:
- Mobile phones (320px - 430px)
- Tablets (768px - 1024px)
- Laptops (1024px - 1440px)
- Large screens (1440px+)

## Instructions

When creating a responsive component:

### 1. Create the shared component in `packages/ui/src/components/`

```typescript
// packages/ui/src/components/ComponentName/index.tsx
import { View, Text, Pressable } from 'react-native'
import { cn } from '../../utils/cn'

interface ComponentNameProps {
  className?: string
  children: React.ReactNode
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <View className={cn(
      // Base (mobile-first)
      'p-4',
      // Tablet (md:)
      'md:p-6',
      // Desktop (lg:)
      'lg:p-8',
      // Large desktop (xl:)
      'xl:p-12',
      className
    )}>
      {children}
    </View>
  )
}
```

### 2. Export from package index

```typescript
// packages/ui/src/index.ts
export { ComponentName } from './components/ComponentName'
```

### 3. Use in web app

```typescript
// apps/web/app/page.tsx
import { ComponentName } from '@zenskin/ui'

export default function Page() {
  return <ComponentName>Content</ComponentName>
}
```

### 4. Use in mobile app

```typescript
// apps/mobile/app/index.tsx
import { ComponentName } from '@zenskin/ui'

export default function Screen() {
  return <ComponentName>Content</ComponentName>
}
```

## Breakpoint Reference

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| (default)  | 0px       | Small phones   |
| sm:        | 640px     | Large phones   |
| md:        | 768px     | Tablets        |
| lg:        | 1024px    | Laptops        |
| xl:        | 1280px    | Desktops       |
| 2xl:       | 1536px    | Large screens  |

## Common Responsive Patterns

### Spacing
```
p-4 md:p-6 lg:p-8 xl:p-12
```

### Typography
```
text-sm md:text-base lg:text-lg
```

### Grid Columns
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

### Flex Direction
```
flex-col md:flex-row
```

### Visibility
```
hidden md:block    // Hide on mobile, show on tablet+
md:hidden          // Show on mobile, hide on tablet+
```
