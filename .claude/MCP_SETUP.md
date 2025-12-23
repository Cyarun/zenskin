# MCP Server Setup Guide

This guide explains how to set up MCP (Model Context Protocol) servers for the ZenSkin project.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code CLI                          │
├─────────────────────────────────────────────────────────────┤
│  MCP Servers (for AI assistant features)                    │
│  ├── shadcn-ui MCP - Component generation & theming         │
│  ├── Supabase MCP (HTTP) - Schema exploration, queries      │
│  ├── Playwright MCP - Browser automation & UI testing       │
│  ├── GitHub MCP - Repository & PR management                │
│  ├── Filesystem MCP - File operations                       │
│  └── Fetch MCP - HTTP requests                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Code                          │
├─────────────────────────────────────────────────────────────┤
│  Direct Supabase Connection (for app functionality)         │
│  ├── Next.js (Web) → NEXT_PUBLIC_SUPABASE_URL              │
│  └── Expo (Mobile) → EXPO_PUBLIC_SUPABASE_URL              │
└─────────────────────────────────────────────────────────────┘
```

**Key Principle**:
- **MCP** = For Claude Code to explore database, manage repos, etc.
- **Direct URLs** = For application code to connect to Supabase

## Quick Start - Add Supabase MCP

Run this command to add Supabase MCP to your project:

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=icbmajphxyzoobwhdmfl"
```

## Required Environment Variables

For **GitHub MCP**, add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
# GitHub (for PR operations)
export GITHUB_TOKEN="ghp_your_personal_access_token"
```

Then reload your shell:
```bash
source ~/.zshrc  # or ~/.bashrc
```

## MCP Servers Configuration

The configuration file is at `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
      },
      "description": "Supabase MCP server for database operations, auth, and storage"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "GitHub MCP server for repository management and PR operations"
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/cynor/cursor-projects/claude-skill"
      ],
      "description": "Filesystem MCP server for file operations"
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-fetch"],
      "description": "Fetch MCP server for HTTP requests to APIs"
    }
  }
}
```

## Installing MCP Server Packages

Run these commands to pre-install MCP server packages:

```bash
# Pre-install all MCP server packages globally (recommended)
npm install -g shadcn-ui-mcp-server
npm install -g @supabase/mcp-server
npm install -g @anthropic-ai/mcp-server-playwright
npm install -g @modelcontextprotocol/server-github
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-fetch

# Or let npx install them on-demand (slower first run)
```

## Verifying MCP Setup

### 1. Check Environment Variables
```bash
echo $SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
echo $GITHUB_TOKEN
```

### 2. Test MCP Servers Manually
```bash
# Test Supabase MCP
SUPABASE_URL="https://icbmajphxyzoobwhdmfl.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="your-key" \
npx -y @supabase/mcp-server

# Test GitHub MCP
GITHUB_PERSONAL_ACCESS_TOKEN="ghp_xxx" \
npx -y @modelcontextprotocol/server-github

# Test Fetch MCP
npx -y @anthropic-ai/mcp-server-fetch
```

### 3. Check Claude Code MCP Status
Inside Claude Code CLI:
```
/mcp
```
This shows connected MCP servers and their status.

## Troubleshooting

### "MCP server failed to start"
1. Check environment variables are exported
2. Ensure npm packages are installed
3. Verify credentials are valid

### "Permission denied"
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### "Module not found"
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install -g @supabase/mcp-server
```

### Supabase Connection Issues
1. Verify Supabase project is running
2. Check service role key is correct
3. Ensure project URL has no trailing slash

## Adding New MCP Servers

To add a new MCP server, edit `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "new-server": {
      "command": "npx",
      "args": ["-y", "@package/mcp-server"],
      "env": {
        "API_KEY": "${YOUR_API_KEY}"
      },
      "description": "Description of what this server does"
    }
  }
}
```

## Available MCP Server Tools

### shadcn-ui MCP
- Component scaffolding and generation
- Theme configuration assistance
- Multi-framework support (React, React Native, Vue, Svelte)
- Component documentation lookup
- tweakcn theme integration

### Supabase MCP
- Database queries and mutations
- Auth operations
- Storage management
- Real-time subscriptions

### Playwright MCP
- Browser automation
- UI testing and screenshots
- Console/network debugging
- Form interactions
- Responsive testing

### GitHub MCP
- Repository management
- Pull request operations
- Issue tracking
- Code search

### Filesystem MCP
- Read/write files
- Directory operations
- File search

### Fetch MCP
- HTTP GET/POST requests
- API integrations
- Web scraping

## Recommended: Create a Setup Script

Create `scripts/setup-mcp.sh`:

```bash
#!/bin/bash

echo "Setting up MCP servers for ZenSkin..."

# Check for required env vars
if [ -z "$SUPABASE_URL" ]; then
  echo "Warning: SUPABASE_URL not set"
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Warning: SUPABASE_SERVICE_ROLE_KEY not set"
fi

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Warning: GITHUB_TOKEN not set"
fi

# Install MCP packages
echo "Installing MCP server packages..."
npm install -g @supabase/mcp-server
npm install -g @modelcontextprotocol/server-github
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-fetch

echo "MCP setup complete!"
echo ""
echo "Don't forget to set environment variables:"
echo "  export SUPABASE_URL='your-url'"
echo "  export SUPABASE_SERVICE_ROLE_KEY='your-key'"
echo "  export GITHUB_TOKEN='ghp_xxx'"
```

Make it executable:
```bash
chmod +x scripts/setup-mcp.sh
```

Run before starting Claude Code:
```bash
./scripts/setup-mcp.sh
```

---

## ZenSkin Credentials Reference

### Supabase (Already Configured)
- **Project URL**: `https://icbmajphxyzoobwhdmfl.supabase.co`
- **Anon Key**: `sb_publishable_Z-qoRsP3_jQR9D36nlIdoA_c82pWZMy`
- **Service Role Key**: `sb_secret_hzEtGNPqNfVRnGTr-bEvYw_kT1x2t10`
- **Database URL**: `postgresql://postgres:Amogh@2017$#$@db.icbmajphxyzoobwhdmfl.supabase.co:5432/postgres`

### SkillsMP API
- **API Key**: `sk_live_skillsmp_i9AIWC0alNkSmWW_-mFXGC-2EwvKu8D-k-dllw19Z4o`

**IMPORTANT**: Never commit actual credentials to git. Use environment variables!

---

## Design System Integration

The MCP servers work together with the ZenSkin design system for efficient development.

### Using shadcn-ui MCP for Components

When building UI, the shadcn-ui MCP can help scaffold components that match our design system:

```
Request: "Create a product card component following ZenSkin design"
```

The MCP will reference:
- `.claude/skills/shadcn-ui.md` - Component patterns and theming
- `.claude/skills/design-system.md` - Color palette, typography, spacing
- `tailwind.config.ts` - Configured design tokens

### Design Token Quick Reference

**Colors** (use these Tailwind classes):
```
Backgrounds: bg-white, bg-snow, bg-cream, bg-soft-gray
Text: text-rich-black, text-medium-gray, text-muted-gray
Accent: bg-gold, text-gold, border-gold
Wellness: bg-sage, text-sage
```

**Typography**:
```
Headlines: font-serif text-hero (or text-section)
Body: font-sans text-body
Navigation: text-nav uppercase tracking-wider
```

**Spacing** (section padding):
```
Desktop: py-24 (96px)
Mobile: py-16 (64px)
```

### Using Playwright MCP for Design Testing

Test responsive design across breakpoints:

```javascript
// Test mobile view
browser_resize({ width: 375, height: 667 })
browser_take_screenshot({ filename: 'mobile-home.png' })

// Test tablet view
browser_resize({ width: 768, height: 1024 })
browser_take_screenshot({ filename: 'tablet-home.png' })

// Test desktop view
browser_resize({ width: 1440, height: 900 })
browser_take_screenshot({ filename: 'desktop-home.png' })
```

### Recommended Workflow

1. **Plan Component** - Reference design-system.md for specs
2. **Generate with shadcn-ui** - Use MCP to scaffold
3. **Style with Tailwind** - Apply ZenSkin tokens from tailwind.config.ts
4. **Test with Playwright** - Verify responsive behavior
5. **Commit with GitHub** - Push and create PR

### Skills Available for Design

| Skill | Purpose |
|-------|---------|
| `shadcn-ui.md` | Component patterns, CSS variables, theming |
| `design-system.md` | Colors, typography, spacing, guidelines |
| `ui-ux-design.md` | E-commerce UX patterns |
| `responsive-component.md` | Multi-device responsive patterns |
| `webapp-testing.md` | Browser testing workflows |
