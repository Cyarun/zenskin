# SkillsMP API Integration Specification

> Spec: SkillsMP Integration
> Created: 2025-12-22
> Status: Planning

## Overview

Integrate SkillsMP API to discover and utilize AI agent skills for development workflow automation, enabling the team to find pre-built solutions for common development patterns.

## User Stories

### Developer Skill Discovery

As a developer, I want to search for relevant AI skills from SkillsMP, so that I can leverage pre-built solutions and accelerate development.

When implementing a new feature, the developer can query SkillsMP for related skills, review the results, and copy useful patterns into the project.

## Spec Scope

1. **API Client** - TypeScript client for SkillsMP API with proper error handling
2. **Search Utility** - CLI tool to search for skills from the terminal
3. **Skill Installation** - Helper to copy skills to the correct directory
4. **Documentation** - Usage guide and examples

## Out of Scope

- SkillsMP account management
- Skill publishing (we only consume skills)
- Automatic skill updates

## Expected Deliverable

1. Developers can search SkillsMP from their development environment
2. Search results display skill name, description, stars, and installation instructions
3. Skills can be easily copied to the project's skills directory

---

## API Reference

### Base URL
```
https://skillsmp.com/api/v1
```

### Authentication
```
Authorization: Bearer sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o
```

### Endpoints

#### Keyword Search
```
GET /skills/search
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search query |
| page | number | No | Page number (default: 1) |
| limit | number | No | Results per page (max: 100) |
| sortBy | string | No | Sort by 'stars' or 'recent' |

**Example:**
```bash
curl "https://skillsmp.com/api/v1/skills/search?q=react+native&limit=10" \
  -H "Authorization: Bearer sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o"
```

#### AI Semantic Search
```
GET /skills/ai-search
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Natural language query |

**Example:**
```bash
curl "https://skillsmp.com/api/v1/skills/ai-search?q=e-commerce+checkout+with+razorpay" \
  -H "Authorization: Bearer sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o"
```

### Error Codes

| Code | Meaning |
|------|---------|
| 401 | Missing or invalid API key |
| 400 | Missing required query parameter |
| 500 | Internal server error |

---

## Implementation

### TypeScript Client

```typescript
// packages/utils/src/skillsmp.ts

const SKILLSMP_BASE_URL = 'https://skillsmp.com/api/v1'
const SKILLSMP_API_KEY = process.env.SKILLSMP_API_KEY

interface Skill {
  id: string
  name: string
  description: string
  stars: number
  repoUrl: string
  installCommand: string
}

interface SearchResponse {
  skills: Skill[]
  total: number
  page: number
}

export async function searchSkills(
  query: string,
  options?: { limit?: number; sortBy?: 'stars' | 'recent' }
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    limit: String(options?.limit ?? 20),
    ...(options?.sortBy && { sortBy: options.sortBy }),
  })

  const response = await fetch(
    `${SKILLSMP_BASE_URL}/skills/search?${params}`,
    {
      headers: {
        Authorization: `Bearer ${SKILLSMP_API_KEY}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`SkillsMP API error: ${response.status}`)
  }

  return response.json()
}

export async function aiSearchSkills(query: string): Promise<SearchResponse> {
  const response = await fetch(
    `${SKILLSMP_BASE_URL}/skills/ai-search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${SKILLSMP_API_KEY}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`SkillsMP API error: ${response.status}`)
  }

  return response.json()
}
```

### Useful Search Queries for ZenSkin

| Use Case | Query |
|----------|-------|
| E-commerce | `e-commerce checkout cart` |
| Payments | `razorpay payment integration india` |
| Authentication | `supabase auth react native` |
| Forms | `react hook form validation` |
| State | `zustand state management` |
| Responsive | `tailwindcss responsive mobile` |
| Testing | `vitest react native testing` |
| Skin Analysis | `image analysis ai camera` |
| Subscriptions | `subscription billing recurring` |
