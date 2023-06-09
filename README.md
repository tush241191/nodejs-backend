# Backend API

A REST+JSON API service

## Quickstart

1. Install required packages:

   ```
   npm install
   ```

2. Copy `.env.development` to `.env` and edit it with your settings.

3. Create new migration based on the schema changes

   ```
   npx prisma migrate dev --name SPECIFY NAME
   ```

4. Build DB from scratch - Run migrations and seed the data

   ```
   npx prisma migrate reset --preview-feature
   ```

5. Seed the database data when DB already is up to date

   ```
   npx prisma db seed
   ```
