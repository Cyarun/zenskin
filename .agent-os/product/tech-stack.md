# Technical Stack

## Overview

Cross-platform solution using React Native for mobile apps and Next.js for web, sharing code through a monorepo architecture.

## Frontend - Web

- App Framework: Next.js 15+
- Language: TypeScript 5.x
- CSS Framework: TailwindCSS 4.0
- UI Components: shadcn/ui (Radix primitives)
- State Management: Zustand
- Form Handling: React Hook Form + Zod
- Animation: Framer Motion

## Frontend - Mobile

- Framework: React Native 0.76+
- Navigation: Expo Router
- Build System: Expo SDK 52+
- UI Library: NativeWind (TailwindCSS for RN)
- State Management: Zustand (shared with web)

## Code Sharing Strategy

- Architecture: Turborepo monorepo
- Shared Packages: UI components, utilities, types, API client
- Platform-Specific: Native modules, navigation, assets

## Backend

- Runtime: Node.js 22 LTS
- API Framework: Next.js API Routes + tRPC
- Database: PostgreSQL 17+ (Supabase)
- ORM: Prisma
- Authentication: Supabase Auth
- File Storage: Supabase Storage / Cloudflare R2
- Real-time: Supabase Realtime

## External Services

- Payments: Razorpay (India-focused)
- Email: Resend
- SMS: MSG91 / Twilio
- Analytics: PostHog
- Push Notifications: Expo Push / OneSignal
- CDN: Cloudflare

## AI/ML Services

- Skin Analysis: Custom model or Clarifai
- Personalization: OpenAI API / Claude API
- SkillsMP API: For AI skill discovery and workflow automation

## Development Tools

- Package Manager: pnpm
- Linting: ESLint + Prettier
- Testing: Vitest (unit), Playwright (E2E), Detox (mobile E2E)
- CI/CD: GitHub Actions

## Hosting

- Web: Vercel
- Database: Supabase (managed PostgreSQL)
- Mobile: App Store Connect, Google Play Console
- Domain: zenskin.in (Cloudflare DNS)

## Responsive Breakpoints

```
Mobile S: 320px
Mobile M: 375px
Mobile L: 425px
Tablet: 768px
Laptop: 1024px
Laptop L: 1440px
4K: 2560px
```

## Screen Size Support

### Mobile (React Native)
- iPhone SE (375x667)
- iPhone 14/15 (390x844)
- iPhone 14/15 Pro Max (430x932)
- Android Small (360x640)
- Android Medium (412x915)
- Android Large (480x853)

### Web (Next.js)
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+
