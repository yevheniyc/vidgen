# VidGen

A Next.js application for video generation and management.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later)
- PostgreSQL (for database)

## Getting Started

please make sure to setup .env
`bash
    DATABASE_URL
    DIRECT_URL
    `

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd vidgen
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up Prisma:

   ```bash
   # Install Prisma CLI globally (if not already installed)
   npm install -g prisma

   # Generate Prisma Client
   npx prisma generate
   ```

   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npx prisma generate` - Generate Prisma Client
- `npx prisma studio` - Open Prisma Studio to manage your database

## Project Structure

- `/app` - Next.js app directory containing pages and components
- `/public` - Static assets
- `/prisma` - Database schema and migrations
- `/node_modules` - Project dependencies
- Configuration files:
  - `next.config.ts` - Next.js configuration
  - `tsconfig.json` - TypeScript configuration
  - `postcss.config.mjs` - PostCSS configuration
  - `eslint.config.mjs` - ESLint configuration

## Tech Stack

- Next.js 15.3.1
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Prisma (Database ORM)
- PostgreSQL (Database)
