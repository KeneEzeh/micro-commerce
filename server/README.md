# Micro-Commerce Server (NestJS)

## Quickstart

1. cd server
2. npm install
3. npm run seed
4. npm run start

## Notes

- This uses SQLite for ease of setup.
- Since I used SQLite for this assessment, use "db.sqlite" as the DB_PATH for a stress-free start up.
- Auth returns a simple accessToken JWT on register/login.

## Seed

Run `npm run seed` to create an admin user (admin@example.com / Admin123!) and demo products.

## API Endpoints

1. To register a new user;

POST /auth/register

Example request:

```
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "123456"
}
```

Example response:

```
{
  "id": "uuid",
  "email": "jane@example.com",
  "token": "eyJhbGciOi..."
}
```

2. To Login

POST /auth/login

Example request:

```
{
  "email": "jane@example.com",
  "password": "123456"
}

```

Example response:

```
{
  "id": "uuid",
  "email": "jane@example.com",
  "token": "eyJhbGciOi..."
}

```

3. Get Products

GET /products

Example response:

```
[
  {
    "id": "1e6e60aa-9c3f-45af-97c1-2577cc1b1c21",
    "title": "Fine Shoe",
    "description": "Comfortable running shoe",
    "price": 29.99,
    "inventory": 10,
    "category": "Footwear",
    "image": null
  }
]
```

4. Create Products (Admin Only)

POST /products

Example request:

```
{
  "title": "New Watch",
  "description": "Luxury analog wristwatch",
  "price": 199.99,
  "inventory": 5,
  "category": "Accessories"
}

```

Example response:

```
{
  "id": "c46b29b0-79ff-4bc9-8ad6-6e30b2cd71b0",
  "title": "New Watch",
  "description": "Luxury analog wristwatch",
  "price": 199.99,
  "inventory": 5,
  "category": "Accessories",
  "image": null
}

```

5. Update Product (Admin Only)

PUT /products/:id

Example request:

```
{
  "price": 179.99,
  "inventory": 8
}

```

Example response:

```
{
  "id": "c46b29b0-79ff-4bc9-8ad6-6e30b2cd71b0",
  "title": "New Watch",
  "description": "Luxury analog wristwatch",
  "price": 179.99,
  "inventory": 8,
  "category": "Accessories",
  "image": null
}

```

6. Delete Product (Admin Only)

DELETE /products/:id

Example response:

```
{
  "message": "Product deleted successfully"
}

```

7. Add item to cart

POST /cart

Example response:

```
{
  "id": "e63a8b6d-95b3-4e94-a5d2-54a9b6bb93c7",
  "product": {
    "id": "c46b29b0-79ff-4bc9-8ad6-6e30b2cd71b0",
    "title": "New Watch"
  },
  "quantity": 2
}

```

8. Get User Cart

GET /cart

Example response:

```
[
  {
    "id": "e63a8b6d-95b3-4e94-a5d2-54a9b6bb93c7",
    "product": {
      "id": "c46b29b0-79ff-4bc9-8ad6-6e30b2cd71b0",
      "title": "New Watch",
      "price": 179.99
    },
    "quantity": 2
  }
]

```

9. Remove Item from Cart

DELETE /cart/:id

Example response:

```
{
  "message": "Item removed from cart"
}

```

10. Create Order from Cart

POST /orders

Example response:

```
{
  "id": "ecf9b7f2-bde4-42a8-86b3-bbd2f7ee3d9d",
  "user": { "id": "uuid", "email": "jane@example.com" },
  "total": 359.98,
  "items": [
    {
      "product": {
        "id": "c46b29b0-79ff-4bc9-8ad6-6e30b2cd71b0",
        "title": "New Watch",
        "price": 179.99
      },
      "quantity": 2
    }
  ],
  "createdAt": "2025-10-03T14:28:45.000Z"
}

```

11. Get User Orders

GET /orders

Example response:

```
[
  {
    "id": "ecf9b7f2-bde4-42a8-86b3-bbd2f7ee3d9d",
    "total": 359.98,
    "items": [
      {
        "product": {
          "title": "New Watch",
          "price": 179.99
        },
        "quantity": 2
      }
    ]
  }
]

```
