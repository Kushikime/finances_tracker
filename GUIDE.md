# Project Approach Guide

## Reading Order for Documentation

Please follow this exact order when reviewing the project documentation:

1. **PROJECT_SUMMARY.md** - Start here for the high-level overview and architecture
2. **USER_STORIES.md** - Understand the application requirements and user needs
3. **docs/dbdiagram.dbml** - Review the database schema before any implementation
4. **docs/UI_FLOW.md** - Examine UI/UX requirements after understanding data models
5. **IMPLEMENTATION_ROADMAP.md** - Follow the phased implementation plan

## Development Order (Critical)

For each feature, strictly adhere to this order:

1. Database schema and migrations first
2. API endpoints based on those schemas
3. Frontend components consuming the APIs

## Key Points to Focus On

- PostgreSQL runs locally (username: kushi, password: 0127887) - no Docker needed
- This is a monorepo structure with pnpm workspaces
- Follow the SPA architecture for frontend with sidebar navigation
- Implement sharing capabilities for goals and envelopes
- Ensure proper authentication flows and protected routes

## Implementation Notes

- All database entities should have proper relationships and constraints
- API endpoints must use Zod for validation
- Frontend components should use Tailwind CSS for styling
- Maintain TypeScript types across the entire application

## Important Constraints

- **DO NOT** attempt to run the application
- **FOCUS ONLY** on implementation of the requested code
- **DO NOT** make assumptions about requirements not specified in the documentation
- **FOLLOW** the project structure as defined in the documentation
- **MAINTAIN** strict typing throughout the codebase

## When Helping with Code:

1. First clarify which phase of the roadmap is being implemented
2. Check if database schema is already defined before API implementation
3. Ensure API endpoints exist before implementing UI components
4. Always follow the existing patterns in the codebase
5. Prioritize code correctness over additional features
