# Canva Litmus Clone

A full-stack Canva-like design application with a web-based editor and backend API/storage.

## Architecture

This is a monorepo using Turborepo with the following workspaces:

- `apps/api` - Backend API (Express + TypeScript + Prisma + Postgres)
- `apps/web` - Frontend web app (Vite + React + TypeScript + Konva)
- `packages/shared` - Shared TypeScript types and utilities

## Quick Start with Docker

The easiest way to get started is using Docker Compose:

1. Start PostgreSQL:
   ```bash
   docker-compose up -d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   cd ../..
   ```

4. Run in development:
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Manual Setup (without Docker)

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL database (or use Docker)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   cp apps/api/.env.example apps/api/.env
   # Edit .env and apps/api/.env with your database URL
   ```

3. Set up PostgreSQL (or use the provided docker-compose.yml):
   ```bash
   docker-compose up -d
   ```

4. Set up the database:
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   cd ../..
   ```

### Development

Run all services in development mode:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Building

Build all packages:
```bash
npm run build
```

## Project Structure

```
canva-litmus-clone/
├── apps/
│   ├── api/          # Backend API
│   └── web/          # Frontend web app
├── packages/
│   └── shared/       # Shared types and utilities
├── .gitignore
├── package.json
├── README.md
└── turbo.json
```

## Features

- **Web-based Design Editor**
  - Canvas-based editor using Konva
  - Add and manipulate shapes, text, and images
  - Drag, resize, and layer elements
  - Export designs to PNG

- **Backend API**
  - RESTful API for designs and assets
  - Prisma ORM with PostgreSQL
  - File upload and storage abstraction (local/S3-ready)
  - CORS enabled for cross-origin requests

- **Shared Types**
  - Common TypeScript interfaces used across frontend and backend

## API Endpoints

### Designs
- `POST /api/designs` - Create a new design
- `GET /api/designs/:id` - Get a design by ID
- `PUT /api/designs/:id` - Update a design
- `DELETE /api/designs/:id` - Delete a design
- `GET /api/designs` - List all designs

### Assets
- `POST /api/assets` - Upload an asset
- `GET /api/assets/:id` - Get an asset by ID

## Environment Variables

See `.env.example` for all available environment variables.

## License

MIT
