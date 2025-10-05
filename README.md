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

## Notes:

- For the application to start, please ensure to create a .env file and provide the necessary environmental variables as show in the ".env.sample" file.

- Follow each folder's README for setup.

## Known Limitations

- No payment gateway yet
- Admin panel limited to product CRUD and order view only
- No email verification / password reset
- SQLite intended for demo & local use only
