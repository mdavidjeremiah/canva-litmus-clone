# Quick Start Guide

Get the Canva Litmus Clone up and running in 5 minutes!

## Prerequisites

- Docker (for PostgreSQL) or an existing PostgreSQL installation
- Node.js 18+ and npm 9+

## Step 1: Start PostgreSQL

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port 5432.

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Database

```bash
cd apps/api
npx prisma migrate dev
npx prisma generate
cd ../..
```

This creates the database schema and generates the Prisma client.

## Step 4: Run Development Servers

```bash
npm run dev
```

This starts both the API (http://localhost:3001) and web app (http://localhost:5173).

## Step 5: Create Your First Design

1. Open http://localhost:5173 in your browser
2. Click "+ New Design"
3. Add shapes, text, or images using the toolbar
4. Drag, resize, and rotate elements on the canvas
5. Edit properties in the right panel
6. Click "Save" to persist your design
7. Click "Export PNG" to download your design

## Stopping the Servers

Press `Ctrl+C` to stop the development servers.

To stop PostgreSQL:
```bash
docker-compose down
```

## Troubleshooting

### Database Connection Error

Make sure PostgreSQL is running:
```bash
docker-compose ps
```

If it's not running, start it:
```bash
docker-compose up -d
```

### Port Already in Use

If port 3001 or 5173 is already in use, you can change them in:
- `apps/api/.env` (API_PORT)
- `apps/web/vite.config.ts` (server.port)

### Prisma Issues

If you encounter Prisma-related errors, try regenerating the client:
```bash
cd apps/api
npx prisma generate
```

## Next Steps

- Read the [Architecture](./ARCHITECTURE.md) document for detailed information
- Check out [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- Explore the codebase starting from `apps/web/src/App.tsx`
