# Micro-Commerce Server (NestJS) - Scaffold

## Quickstart

1. cd server
2. npm install
3. npm run seed
4. npm run start

Server will run on http://localhost:3000

## Notes
- This scaffold uses SQLite for ease of setup.
- Auth returns a simple accessToken JWT on register/login.
- Admin guard is not applied to admin endpoints in this scaffold; add Guard for production.

## Seed
Run `npm run seed` to create an admin user (admin@example.com / Admin123!) and demo products.
