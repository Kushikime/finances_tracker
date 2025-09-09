#!/bin/bash

# Setup script for Finances Tracker project
echo "📦 Setting up Finances Tracker project..."

# Install dependencies
echo "🔧 Installing dependencies..."
pnpm install

# Set up environment files
echo "⚙️  Creating environment files..."
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Set up database
echo "🗄️  Setting up database..."
docker-compose up -d postgres

# Build packages
echo "🏗️  Building shared packages..."
pnpm --filter db build
pnpm --filter shared build

# Final message
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Run 'pnpm dev' to start the development servers"
echo "  2. Navigate to http://localhost:3000 for the web app"
echo "  3. The API server will be available at http://localhost:3001"
