# ZenSkin Development Setup Guide

## Quick Start

This document explains how to set up and use the ZenSkin development environment with Claude Code.

## What's Been Configured

### 1. Agent OS Product Documentation

Located in `.agent-os/product/`:

| File | Purpose |
|------|---------|
| `mission.md` | Full product vision, users, problems, features |
| `mission-lite.md` | Condensed version for AI context |
| `tech-stack.md` | Technology choices and architecture |
| `roadmap.md` | 5-phase development plan |
| `decisions.md` | Key architectural decisions |

### 2. Claude Code Skills

Located in `.claude/skills/`:

| Skill | Purpose |
|-------|---------|
| `skillsmp-search.md` | Search SkillsMP for AI development skills |
| `responsive-component.md` | Generate cross-platform responsive components |
| `zenskin-feature.md` | Feature development guide with patterns |

### 3. MCP Servers Configuration

Located in `.claude/mcp.json`:

| Server | Purpose |
|--------|---------|
| `supabase` | Database, auth, storage operations |
| `github` | Repository and PR management |
| `filesystem` | File operations |
| `fetch` | HTTP API requests |

### 4. Design System

`tailwind.config.ts` includes:
- Brand colors (primary green, secondary purple)
- Responsive breakpoints (mobile to 4K)
- Custom typography scale
- Safe area spacing for mobile
- Custom animations

---

## Using SkillsMP API

Your API key is configured. Here's how to use it:

### Search for Skills

```bash
# Keyword search
curl "https://skillsmp.com/api/v1/skills/search?q=react+native+e-commerce&limit=10" \
  -H "Authorization: Bearer sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o"

# AI semantic search
curl "https://skillsmp.com/api/v1/skills/ai-search?q=checkout+flow+with+razorpay" \
  -H "Authorization: Bearer sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o"
```

### Useful Queries for ZenSkin

- `react native e-commerce` - Mobile shopping patterns
- `supabase auth` - Authentication flows
- `razorpay integration` - Payment processing
- `tailwindcss responsive` - Responsive design patterns
- `zustand state` - State management

---

## Next Steps

### 1. Initialize the Monorepo

```bash
# Create project structure
npx create-turbo@latest zenskin --example with-tailwind

# Or manually:
mkdir -p apps/{web,mobile} packages/{ui,api,db,utils,types}
pnpm init
```

### 2. Set Up Environment Variables

Create `.env.local` files:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Razorpay
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-secret

# SkillsMP
SKILLSMP_API_KEY=sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o
```

### 3. Start Development

Use Agent OS commands:

```
/create-spec     # Plan a new feature
/execute-tasks   # Implement features
```

---

## Responsive Design Guide

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| (default) | 0px | Small phones |
| xs: | 375px | iPhone SE |
| sm: | 640px | Large phones |
| md: | 768px | Tablets |
| lg: | 1024px | Laptops |
| xl: | 1280px | Desktops |
| 2xl: | 1536px | Large screens |

### Mobile-First Pattern

```tsx
<div className="
  p-4              // Mobile (default)
  sm:p-5           // Large phones
  md:p-6           // Tablets
  lg:p-8           // Laptops
  xl:p-12          // Desktops
">
```

### Grid Columns

```tsx
<div className="
  grid grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2        // Large phones: 2 columns
  md:grid-cols-3        // Tablets: 3 columns
  lg:grid-cols-4        // Laptops: 4 columns
">
```

---

## Project Structure

```
zenskin/
├── apps/
│   ├── web/                 # Next.js 15 website
│   │   ├── app/            # App router pages
│   │   └── components/     # Web-specific components
│   └── mobile/             # React Native (Expo)
│       ├── app/            # Expo Router screens
│       └── components/     # Mobile-specific components
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── api/                # tRPC router
│   ├── db/                 # Prisma schema
│   ├── utils/              # Shared utilities
│   └── types/              # TypeScript types
├── .agent-os/              # Product documentation
├── .claude/                # Claude Code config
│   ├── skills/            # Custom skills
│   └── mcp.json           # MCP servers
├── CLAUDE.md               # Project instructions
└── tailwind.config.ts      # Design system
```

---

## Support

- Agent OS Guide: https://buildermethods.com/agent-os
- SkillsMP: https://skillsmp.com
- Supabase Docs: https://supabase.com/docs
- Expo Docs: https://docs.expo.dev
- Next.js Docs: https://nextjs.org/docs
