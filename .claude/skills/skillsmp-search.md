# SkillsMP Search Skill

Search for AI agent skills from the SkillsMP marketplace.

## Usage

Use this skill when you need to find pre-built AI skills for development tasks like:
- React Native components
- E-commerce checkout flows
- Authentication patterns
- API integrations
- Testing utilities

## Instructions

When the user asks to search for skills or find development patterns:

1. **Keyword Search** - For specific terms:
```bash
curl -s "https://skillsmp.com/api/v1/skills/search?q=QUERY&limit=10" \
  -H "Authorization: Bearer $SKILLSMP_API_KEY"
```

2. **AI Semantic Search** - For complex queries:
```bash
curl -s "https://skillsmp.com/api/v1/skills/ai-search?q=QUERY" \
  -H "Authorization: Bearer $SKILLSMP_API_KEY"
```

## Environment Variable

The API key should be stored as `SKILLSMP_API_KEY` in your environment.

## Example Queries

- "react native e-commerce"
- "checkout payment integration"
- "responsive design tailwind"
- "mobile app authentication"
- "skin analysis ai"

## Response Handling

Parse the JSON response and present:
- Skill name and description
- GitHub stars and activity
- Installation instructions
- Relevant code snippets
