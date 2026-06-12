# Land of Promise

Admin-managed class sessions with parent registration, built with Next.js (App Router), Drizzle ORM, and Neon Postgres.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Neon Postgres database and copy `.env.example` to `.env.local`, filling in:

   - `DATABASE_URL` — your Neon connection string
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME` — used to bootstrap the first admin account

3. Run database migrations:

   ```bash
   npm run db:migrate
   ```

4. Seed the first admin account:

   ```bash
   npm run db:seed
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

   - Visit `/register` to register a child for a class session as a parent.
   - Visit `/admin/login` to sign in as an admin and manage class sessions and other admins.

## Database scripts

- `npm run db:generate` — generate a new migration from schema changes in `src/db/schema.ts`
- `npm run db:migrate` — apply migrations to the database
- `npm run db:studio` — open Drizzle Studio to inspect data
- `npm run db:seed` — create the first admin account from env vars
