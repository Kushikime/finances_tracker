# Finances Tracker Project Summary

## Project Overview

This project is a full-stack personal finances tracking application built with a modern tech stack:

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Node.js API
- **Database**: PostgreSQL 
- **Authentication**: JWT-based authentication
- **Project Structure**: Monorepo using pnpm workspaces and Turborepo

The application allows users to sign up, log in, track their income and expenses, and view financial insights through a dashboard.

## Project Structure

```
finances_tracker/
├── apps/
│   ├── api/          # Backend API
│   └── web/          # Frontend Next.js application
├── db/               # Database schema and migrations
├── docs/             # Project documentation
└── packages/
    └── shared/       # Shared code between apps
```

## Backend (API)

### Setup and Configuration

The backend is built with Node.js and structured with modular architecture:

1. **Environment Configuration**:
   - Environment variables management using a config module
   - Validation of environment variables

2. **Database Setup**:
   - PostgreSQL connection pool
   - Transaction support
   - Query utilities

3. **API Structure**:
   - Modular routing
   - Middleware for logging, error handling, and authentication
   - Zod-based validation for request data

### Authentication System

The authentication system includes:

1. **User Management**:
   - User registration with email and password
   - User profile management

2. **JWT Authentication**:
   - Token generation and validation
   - Secure authentication middleware
   - Protected routes

3. **Security Measures**:
   - Password hashing
   - CORS configuration
   - Security headers

### API Endpoints

1. **Authentication Endpoints**:
   - `POST /auth/register` - User registration
   - `POST /auth/login` - User login
   - `GET /auth/me` - Get current user info

2. **User Endpoints**:
   - `GET /users/:id` - Get user details
   - `PUT /users/:id` - Update user information

3. **Health Check**:
   - `GET /health` - API health check

## Frontend (Web)

### Setup and Configuration

The frontend is built with Next.js and configured with:

1. **Next.js Configuration**:
   - Security headers
   - TypeScript support
   - Package transpilation
   - Strict mode enabled

2. **Styling**:
   - Tailwind CSS for styling
   - Custom PostCSS configuration

3. **Authentication**:
   - Client-side authentication state management
   - JWT storage and validation
   - Protected routes with redirection

### Pages and Components

1. **Public Pages**:
   - Home page with feature showcase
   - Login page
   - Registration page

2. **Authenticated Pages**:
   - Dashboard with financial overview
   - Transaction management

3. **Authentication Flow**:
   - Login form with validation
   - Registration form with validation
   - Authentication state persistence
   - Redirects for authenticated/unauthenticated users

### Dashboard (SPA Architecture)

For the next iteration, we'll implement a Single Page Application (SPA) architecture:

1. **Dashboard as Main Interface**:
   - All functionality accessed through dashboard
   - No need for separate pages after login

2. **Sidebar Navigation**:
   - Transaction management
   - Account settings
   - Financial reports
   - Budget planning

## Shared Package

The shared package contains code used by both frontend and backend:

1. **Data Contracts**:
   - TypeScript interfaces
   - Zod schemas for validation

2. **Authentication Utilities**:
   - Token types
   - Authentication interfaces

3. **Database Schemas**:
   - Type definitions for database entities

## Database

1. **Schema**:
   - Users table
   - Transactions table
   - Categories table
   - Goals table
   - Envelopes (piggy banks) table
   - Various junction tables for many-to-many relationships

2. **Migrations**:
   - Initial schema creation

3. **Local PostgreSQL Configuration**:
   - Running locally (no Docker required)
   - Username: kushi
   - Password: 0127887

## Development Workflow

1. **Development Order**:
   - Database schemas and migrations should be developed first
   - API endpoints should be implemented based on the database schemas
   - Frontend UI should be built last, consuming the API endpoints

2. **Local Development**:
   - Run `pnpm dev` to start all services
   - Frontend available at `localhost:3000`
   - Backend available at `localhost:4000`

3. **Building**:
   - Run `pnpm build` to build all packages
   - TypeScript compilation
   - Next.js optimization

## Next Steps

For the next iteration of the project:

1. **SPA Architecture**:
   - Refactor to use dashboard as main interface
   - Implement sidebar navigation

2. **Enhanced Features**:
   - Budget planning and tracking
   - Financial reports and insights
   - Recurring transactions
   - Categories management

3. **User Experience Improvements**:
   - Interactive charts and visualizations
   - Mobile responsiveness
   - Dark mode
   - Notifications

4. **Technical Improvements**:
   - Unit and integration tests
   - CI/CD pipeline
   - Dockerization
   - Performance optimization

## Troubleshooting

Common issues encountered:

1. **Tailwind CSS Configuration**:
   - Ensure PostCSS is properly configured
   - Check content paths in tailwind.config.js
   - Verify imports in global CSS

2. **Monorepo Dependencies**:
   - Workspace package resolution
   - Shared types and code

3. **Authentication Flow**:
   - JWT token storage and validation
   - Protected routes implementation
   - Redirection logic
