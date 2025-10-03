# Copilot Instructions for Application_Test

## Overview
This codebase is a NestJS application providing authentication, authorization, and modular API endpoints for managing employee and skill data, with MongoDB as the primary datastore. It is structured for extensibility and maintainability, using best practices for middleware, guards, and global interceptors.

## Architecture
- **Entry Point:** `src/main.ts` bootstraps the app, sets up global pipes/interceptors, and configures Swagger for API docs.
- **Modules:** Located in `src/modules/`, each module (e.g., `auth`, `employee`, `skill`) encapsulates controllers, services, and guards for a domain area.
- **Global Middleware/Guards:** Custom logger middleware (`src/utils/loggerModule/logger.middleware.ts`) and guards (`auth.guard.ts`, `roles.guard.ts`) are registered globally in `app.module.ts`.
- **Health Checks:** Implemented in `src/health/` for service monitoring.
- **Config & Environment:** Uses `@nestjs/config` and `.env` files. Environment validation is performed at startup (`utils/env.validator.ts`).
- **Error Monitoring:** Integrated with Sentry via `@sentry/nestjs` in `app.module.ts`.

## Developer Workflows
- **Build:** `npm run build` (uses NestJS build system)
- **Start (Dev):** `npm run start:dev` (auto-reloads on changes)
- **Start (Prod):** `npm run start:prod`
- **Lint:** `npm run lint` (auto-fixes with ESLint)
- **Format:** `npm run format` (Prettier)
- **Test:** `npm run test` (Jest)
- **Test Coverage:** `npm run test:cov`
- **E2E Tests:** `npm run test:e2e`
- **JWT Key Generation:** `npm run jwt-key` (generates a random JWT secret)

## Project-Specific Patterns
- **Authentication:**
  - Endpoints under `/auth` use custom guards and decorators (`@Public`, `AuthGuard`).
  - Session management via `req.logout()` in controllers.
- **API Versioning:** Enabled via header `x-api-version` (see `main.ts`).
- **Swagger Docs:** Auto-generated from decorators in controllers; available at `/api` when running.
- **Throttling:** Configured globally with `@nestjs/throttler` in `app.module.ts`.
- **MongoDB Connection:** Connection string is encrypted/decrypted using custom logic in `app.module.ts`.
- **Logging:** All requests pass through a custom logger middleware and response interceptor.

## Integration Points
- **External Services:**
  - Sentry for error tracking
  - MongoDB via Mongoose
- **Angular Dependencies:** Some Angular packages are present but not directly used in the backend; check for shared code or future integration.

## Conventions & Patterns
- **File Structure:**
  - `src/modules/` for feature modules
  - `src/utils/` for shared utilities
  - `src/health/` for health checks
  - `Static FIles/` for static assets
- **Decorators:** Use custom decorators for public endpoints and guards.
- **Environment Variables:** Validate and require critical env vars at startup.

## Key Files
- `src/main.ts` (bootstrap, global config)
- `src/app.module.ts` (module registration, global guards/middleware)
- `src/modules/auth/auth.controller.ts` (auth endpoints)
- `src/utils/loggerModule/logger.middleware.ts` (logging)
- `package.json` (scripts, dependencies)

---
_If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions._
