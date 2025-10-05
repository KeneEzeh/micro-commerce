# Micro-Commerce Full-stack

A lightweight e-commerce platform built with NestJS and SQLite on the backend and React Native (Expo SDK 54) on the mobile side.
It supports user shopping, order creation, and an admin-only product management panel, all secured with JWT authentication.

Folders:

- server/ : NestJS backend (SQLite)
- mobile/ : Expo React Native app

## Features:

Admin:

- Create, edit, delete products
- Manage inventory
- View orders

Users:

- Register / log in / logout
- Browse products
- Add products to cart
- Place orders (auto-clears cart)

## Technology Stack

Backend - NestJS, TypeORM, SQLite

Authentication - JWT

Mobile App - React Native (Expo SDK)

## VARIABLES FOR THE SERVER

PORT= # The port on which the server is / will run on
DB_PATH= # The path for database connection
JWT_SECRET= # The jwt secret

## FOR THE MOBILE

BACKEND_URL= # The url to the server

## Steps to setting up the server

1. cd server
2. cp .env.example .env
3. npm install
4. npm run seed
5. npm run start

## Steps to setting up the mobile

1. cd mobile
2. cp .env.example .env
3. npm install
4. npm run start

## Notes:

- For the application to start, please ensure to create a .env file and provide the necessary environmental variables as shown in the ".env.sample" files.

- Run npm run seed to create an admin user and a few sample products.
  Default admin credentials:

Email: admin@example.com
Password: admin123

- Follow each folder's README for more information.

## Known Limitations

- No payment gateway
- Admin panel limited to product CRUD and order view only
- No email verification / password reset
- SQLite intended for demo & local use only
