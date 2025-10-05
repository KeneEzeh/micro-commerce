## VARIABLES FOR THE SERVER

PORT= # The port on which the server is / will run on
DB_PATH= # The path for database connection
JWT_SECRET= # The jwt secret

## FOR THE MOBILE

BACKEND_URL= # The url to the server

## SETUP INSTRUCTIONS

### Steps to setting up the server

1. cd server
2. cp .env.example .env
3. npm install
4. npm run seed
5. npm run start

### Steps to setting up the mobile

1. cd mobile
2. cp .env.example .env
3. npm install
4. npm run start
