# Finance Tracker App

A modern personal finance tracking application built with Express, React, and PostgreSQL.

## Project Structure

The project follows a monorepo structure:

- `apps/api`: Backend API built with Express
- `apps/web`: Frontend UI built with React (Next.js)
- `packages/shared`: Shared types and validation schemas
- `packages/db`: Database models and utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   Copy the `.env.example` files in both `apps/api` and `apps/web` directories and rename them to `.env`.
   
4. Start the development servers:
   ```bash
   # Start API server
   cd apps/api
   pnpm dev
   
   # In another terminal, start web server
   cd apps/web
   pnpm dev
   ```

## Testing Authentication

You can test the authentication flow in two ways:

### 1. Using the Web UI

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" to register a new account
3. Fill in the form and submit
4. Log in with your new credentials
5. You should be redirected to the dashboard

### 2. Using Test Scripts

Test the auth endpoints:
```bash
node test-auth.js
```

Test the protected endpoints:
```bash
node test-protected.js
```

## API Endpoints

### Public Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Log in and get JWT token
- `GET /health` - Health check endpoint

### Protected Endpoints

- `GET /api/user/profile` - Get current user profile (requires JWT authentication)

## Authentication

The application uses JWT-based authentication:

1. Client sends login request with credentials
2. Server validates credentials and returns JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header for subsequent requests
5. Server validates token for protected endpoints

## Technology Stack

- **Backend**: Express.js, PostgreSQL, Drizzle ORM
- **Frontend**: React, Next.js, TypeScript
- **Authentication**: JWT
- **Validation**: Zod
