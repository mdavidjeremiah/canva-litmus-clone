# API

Backend API for Canva Litmus Clone.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. Set up the database:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

4. Run in development:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

### Health
- `GET /health` - Health check

### Designs
- `GET /api/designs` - List all designs
- `GET /api/designs/:id` - Get a design by ID
- `POST /api/designs` - Create a new design
- `PUT /api/designs/:id` - Update a design
- `DELETE /api/designs/:id` - Delete a design

### Assets
- `POST /api/assets` - Upload an asset
- `GET /api/assets/:id` - Get an asset by ID

### Static Files
- `GET /uploads/:filename` - Serve uploaded files
