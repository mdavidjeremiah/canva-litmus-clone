# Contributing to Canva Litmus Clone

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/canva-litmus-clone.git
   cd canva-litmus-clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   ```bash
   docker-compose up -d
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   cd ../..
   ```

5. Run in development mode:
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for all new code
- Follow existing code conventions
- Run `npm run format` before committing
- Add tests for new features (when applicable)

## Project Structure

- `apps/api` - Backend API with Express, Prisma, and PostgreSQL
- `apps/web` - Frontend React application with Vite
- `packages/shared` - Shared TypeScript types and utilities

## Submitting Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them

3. Format your code:
   ```bash
   npm run format
   ```

4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork and submit a pull request

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
