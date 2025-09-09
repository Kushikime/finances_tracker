# Finances Tracker

A modern personal finance tracking application built with Next.js, tRPC, and PostgreSQL.

## Project Structure

This is a monorepo using pnpm workspaces and Turborepo.

- `apps/web`: Next.js frontend application
- `apps/api`: Express backend with tRPC
- `packages/db`: Database schema and client
- `packages/shared`: Shared types, utilities and validation schemas

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 10 or higher
- PostgreSQL 15 or higher

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.local

# Run development servers
pnpm dev
```

### Building for production

```bash
pnpm build
```

## Features

- Track income and expenses
- Set and track financial goals
- Manage savings with virtual piggy banks
- Data visualization and reporting
- User account management
