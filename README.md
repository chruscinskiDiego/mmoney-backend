# MMoney Backend

Personal finance API built with Node.js, TypeScript and Express, using SQLite persistence through TypeORM.

## Features

- User registration and authentication.
- Bank, account, category and expense management.
- Expense queries and per-user summaries.
- Zod input validation, token authentication and rate limiting.

## Technologies

Node.js, TypeScript, Express, TypeORM, SQLite, bcrypt and JWT.

## Run locally

```bash
git clone https://github.com/chruscinskiDiego/mmoney-backend.git
cd mmoney-backend
npm ci
```

Before starting:

1. Set SERVER_PORT in .env.
2. Review authentication settings in src/middleware and src/controllers/login.controller.ts.
3. Configure your own development certificates: src/server.ts reads src/ssl/code.crt and src/ssl/code.key to start HTTPS.
4. Align CORS with the frontend URL; the current allowed origin is https://localhost:8080.

```bash
npm run dev
```

## Persistence

[src/database/index.ts](src/database/index.ts) configures SQLite at src/database/db.sqlite. The current configuration does not use PostgreSQL. Synchronization is enabled for development and needs review before deployment.

## Structure

- `routes/` and `controllers/`: HTTP interface.
- `services/`: application operations.
- `repositories/`, `entities/` and `database/`: data access.
- `schemas/`: input validation.
- `middleware/`: authentication.

## Web client

[MMoney Frontend](https://github.com/chruscinskiDiego/mmoney-frontend).

## Scope and validation

Personal study project. TLS material and a database file are versioned in the repository; replace them with local resources before using real data. The npm test script is still a placeholder.
