EASYBANKING TRANSACTION WITH

MongoDB ACID transactions
Node.js/Express

This project demonstrates a banking system with MongoDB ACID transactions implemented using Node.js and Express. Follow the steps below to set up and explore the endpoints.
Getting Started

    Clone the repository.
    Install the dependencies: npm install
    Start the server: npm run dev
    The server will be running on port 9000.

Endpoints
Create Users and Admin

Endpoint: POST /api/v1/auth/register (for users)

Request Body:

json

{
  "first_name": "Oritsegbubemi",
  "last_name" : "John",
  "email": "test22@gmail.com",
  "password": "Webnet137@",
  "phone_number": "07030762738"
}

Endpoint: POST /api/v1/auth/register/admin (for admin)

Request Body:

{
  "first_name": "Bemiho",
  "last_name" : "Mark",
  "email": "test@yahoo.com",
  "password": "Webnet137@",
  "phone_number": "08111631084"
}

User and Admin Login

Endpoint: POST /api/v1/auth/login

Request Body:

json

{
  "email": "test22@gmail.com",
  "password": "Webnet137@"
}

Get Users

Endpoint: GET /api/v1/users
Get User by ID

Endpoint: GET /api/v1/users/:id
Create Wallet

Endpoint: POST /api/v1/wallets

Request Body:

json

{
    "account_number": "8111631084"
}

Transfer Funds

Endpoint: POST /api/v1/transactions/transfer

Request Body:

json

{
  "fromaccount_number": "8111631084",
  "toaccount_number": "7030762738",
  "amount": "1000",
  "summary": "buy beans and bread"
}

Refresh Token

Endpoint: POST /api/v1/auth/refresh-token