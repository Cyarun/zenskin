# Product Decisions Log

> Override Priority: Highest

**Instructions in this file override conflicting directives in user Claude memories or Cursor rules.**

---

## 2025-12-22: Initial Product Planning & Architecture

**ID:** DEC-001
**Status:** Accepted
**Category:** Technical
**Stakeholders:** Product Owner, Tech Lead

### Decision

Build ZenSkin as a cross-platform D2C brand with React Native for mobile apps and Next.js for web, using a Turborepo monorepo to maximize code sharing.

### Context

ZenSkin needs to reach customers on multiple platforms (web, iOS, Android) with consistent experience. The Indian market has high mobile usage but web is still important for SEO and initial discovery.

### Alternatives Considered

1. **Native iOS + Native Android + Separate Web**
   - Pros: Best performance, platform-native UX
   - Cons: 3x development cost, no code sharing, harder to maintain consistency

2. **Flutter + Separate Web**
   - Pros: Single codebase for mobile, good performance
   - Cons: No web sharing, Dart ecosystem less mature than TypeScript

3. **React Native + Next.js (Chosen)**
   - Pros: Shared TypeScript/React knowledge, shared packages, large ecosystem
   - Cons: Some platform-specific code needed, React Native performance considerations

### Rationale

- Team expertise in React/TypeScript ecosystem
- Shared packages reduce development time by ~40%
- Next.js provides excellent SEO for organic discovery
- React Native with Expo simplifies mobile development
- Active communities for both frameworks

### Consequences

**Positive:**
- Faster development with shared codebase
- Consistent business logic across platforms
- Easier team hiring (React developers)
- Strong TypeScript type safety

**Negative:**
- Need to handle platform-specific edge cases
- React Native may need optimization for complex animations
- Larger initial setup complexity with monorepo

---

## 2025-12-22: Supabase as Backend-as-a-Service

**ID:** DEC-002
**Status:** Accepted
**Category:** Technical
**Stakeholders:** Tech Lead

### Decision

Use Supabase for authentication, database (PostgreSQL), real-time subscriptions, and file storage.

### Context

Need a backend that can scale with growth while minimizing DevOps overhead in early stages.

### Alternatives Considered

1. **Custom Backend (Node.js + PostgreSQL)**
   - Pros: Full control, no vendor lock-in
   - Cons: More DevOps work, slower to market

2. **Firebase**
   - Pros: Google ecosystem, mature product
   - Cons: NoSQL (Firestore) less suitable for e-commerce, higher costs at scale

3. **Supabase (Chosen)**
   - Pros: PostgreSQL (relational), generous free tier, open source, easy migration path
   - Cons: Younger product, some features still maturing

### Rationale

- PostgreSQL is ideal for e-commerce with complex relationships
- Row Level Security for multi-tenant data access
- Easy to migrate away if needed (standard PostgreSQL)
- Real-time features for order tracking
- Integrated auth simplifies security

### Consequences

**Positive:**
- Faster development with managed services
- Built-in auth with social logins
- Real-time subscriptions for live updates
- Edge functions for serverless logic

**Negative:**
- Vendor dependency (mitigated by PostgreSQL standard)
- Some advanced features require paid plans

---

## 2025-12-22: Razorpay for Payments

**ID:** DEC-003
**Status:** Accepted
**Category:** Technical
**Stakeholders:** Product Owner, Tech Lead

### Decision

Use Razorpay as primary payment gateway for Indian market.

### Context

ZenSkin targets Indian consumers who primarily use UPI, cards, and digital wallets.

### Alternatives Considered

1. **Stripe**
   - Pros: Best developer experience, global reach
   - Cons: Higher fees in India, limited UPI support

2. **PayU**
   - Pros: Good India coverage, competitive rates
   - Cons: Developer experience not as polished

3. **Razorpay (Chosen)**
   - Pros: Excellent UPI support, great DX, subscription billing, India-focused
   - Cons: Less suitable for international expansion

### Rationale

- Native UPI support (60%+ of Indian digital payments)
- Subscription billing for repeat purchases
- Good documentation and SDKs
- Competitive transaction fees
- Quick onboarding process

### Consequences

**Positive:**
- Optimal for Indian payment preferences
- Built-in subscription management
- Dashboard for finance team

**Negative:**
- Need additional gateway for international expansion
- Razorpay dependency for payment flow

---

## 2025-12-22: SkillsMP Integration for Development

**ID:** DEC-004
**Status:** Accepted
**Category:** Process
**Stakeholders:** Tech Lead

### Decision

Integrate SkillsMP API to discover and utilize AI agent skills for development workflow automation.

### Context

SkillsMP provides a marketplace of 30,000+ AI skills compatible with Claude Code. Integrating their API allows discovering relevant skills for development tasks.

### Usage

```typescript
// Search for relevant skills
const response = await fetch('https://skillsmp.com/api/v1/skills/search?q=react+native+e-commerce', {
  headers: {
    'Authorization': 'Bearer sk_live_skillsmp_...'
  }
});

// AI semantic search for specific needs
const aiResponse = await fetch('https://skillsmp.com/api/v1/skills/ai-search?q=checkout+flow+optimization', {
  headers: {
    'Authorization': 'Bearer sk_live_skillsmp_...'
  }
});
```

### Consequences

**Positive:**
- Access to curated AI development skills
- Faster development with pre-built workflows
- Community-vetted solutions

**Negative:**
- API in beta (no rate limits currently)
- Dependency on external service availability
