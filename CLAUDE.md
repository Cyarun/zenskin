# CLAUDE.md - ZenSkin Project Instructions

## Project Overview

ZenSkin.in is a D2C gut-to-skin wellness brand with:
- **Web App**: Next.js 15 for responsive website (zenskin.in)
- **Mobile Apps**: React Native (Expo) for iOS and Android
- **Shared Code**: Turborepo monorepo with shared packages

## Quick Reference

- **Product Mission**: @.agent-os/product/mission-lite.md
- **Tech Stack**: @.agent-os/product/tech-stack.md
- **Roadmap**: @.agent-os/product/roadmap.md
- **Decisions**: @.agent-os/product/decisions.md

## Development Standards

### Code Style
- Use TypeScript strict mode everywhere
- Prefer functional components with hooks
- Use named exports (not default exports)
- Follow Airbnb style guide with Prettier
- 2-space indentation, single quotes, no semicolons

### File Naming
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Types: PascalCase with `.types.ts` suffix
- Constants: UPPER_SNAKE_CASE

### Component Structure
```
ComponentName/
  index.tsx          # Main component
  ComponentName.types.ts
  ComponentName.test.tsx
  useComponentName.ts  # Custom hook if needed
```

### Responsive Design Rules

**Mobile-First Approach**: Always start with mobile styles, then add breakpoints.

```typescript
// TailwindCSS breakpoints (use in this order)
// Default (mobile): no prefix
// sm: 640px+
// md: 768px+
// lg: 1024px+
// xl: 1280px+
// 2xl: 1536px+

// Example
<div className="px-4 md:px-6 lg:px-8 xl:px-12">
```

**React Native (NativeWind)**:
```typescript
// Use responsive utilities
<View className="p-4 tablet:p-6 desktop:p-8">
```

### API Conventions
- Use tRPC for type-safe API calls
- RESTful naming for external APIs
- Always handle loading, error, and success states
- Use React Query for server state

### Testing Requirements
- Unit tests for utilities and hooks
- Component tests for UI components
- E2E tests for critical user flows
- Minimum 80% coverage for shared packages

## Project Structure

```
zenskin/
├── apps/
│   ├── web/                 # Next.js website
│   │   ├── app/            # App router pages
│   │   ├── components/     # Web-specific components
│   │   └── ...
│   └── mobile/             # React Native app
│       ├── app/            # Expo Router screens
│       ├── components/     # Mobile-specific components
│       └── ...
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── api/                # tRPC router and client
│   ├── db/                 # Prisma schema and client
│   ├── utils/              # Shared utilities
│   └── types/              # Shared TypeScript types
├── .agent-os/              # Agent OS documentation
└── turbo.json              # Turborepo config
```

## Commands

```bash
# Development
pnpm dev              # Run all apps in dev mode
pnpm dev:web          # Run web only
pnpm dev:mobile       # Run mobile only

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web for production

# Testing
pnpm test             # Run all tests
pnpm test:coverage    # Run with coverage

# Linting
pnpm lint             # Lint all packages
pnpm format           # Format with Prettier

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Prisma Studio
```

## Environment Variables

Required variables (create `.env.local` in each app):

```bash
# Database (Supabase)
DATABASE_URL=
DIRECT_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# SkillsMP (for AI skill discovery)
SKILLSMP_API_KEY=sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

## External APIs

### SkillsMP API
Used for discovering AI skills to enhance development workflow.

```typescript
// Base URL: https://skillsmp.com/api/v1
// Auth: Bearer token

// Search skills
GET /skills/search?q=react+native&limit=20

// AI semantic search
GET /skills/ai-search?q=e-commerce checkout flow
```

## Important Notes

1. **Never commit secrets** - Use environment variables
2. **Mobile-first** - Design for mobile, enhance for desktop
3. **Accessibility** - All components must be WCAG 2.1 AA compliant
4. **Performance** - Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
5. **Localization** - Prepare for Hindi language support from day one

## Agent OS Commands

- `/plan-product` - Initialize product documentation
- `/create-spec` - Plan a new feature
- `/execute-tasks` - Build and ship code
- `/analyze-product` - Review existing code

---

*ZenSkin - Radiant skin starts from within*
