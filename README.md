# Marfin Test Nutech

## Introduction

Marfin Test Nutech is a Node.js application designed for managing a Payment Point Online Banking (PPOB) system. It provides various functionalities such as user registration, authentication, balance management, top-up transactions, and transaction handling. The application is built with Express and integrates a MySQL database for data management.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/marfin-test-nutech.git
   cd marfin-test-nutech
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   ```

## Usage

To run the application, use the following command:

```bash
npm start
```

The server will start and be accessible at `http://localhost:3000`.

To automatically restart the server on file changes during development, use:

```bash
npm run dev
```

## Features

- **User Registration and Authentication:** Secure user registration and login using JWT tokens.
- **Balance Management:** Check and manage user balances.
- **Top-Up Transactions:** Support for topping up user accounts.
- **Transaction Management:** Comprehensive handling of various transaction types.
- **API Documentation:** Integrated Swagger UI for easy API exploration and testing.

## Dependencies

- **bcryptjs:** ^2.4.3 - For hashing passwords.
- **dotenv:** ^16.4.5 - Loads environment variables from a `.env` file.
- **express:** ^4.19.2 - Web framework for Node.js.
- **jsonwebtoken:** ^9.0.2 - For JWT authentication.
- **mysql2:** ^3.11.0 - MySQL database connector.
- **swagger-jsdoc:** ^6.2.8 - Swagger integration for API documentation.
- **swagger-ui-express:** ^5.0.1 - Serve Swagger UI for API documentation.
- **uuid:** ^10.0.0 - Generate unique identifiers.

**DevDependencies:**

- **nodemon:** ^3.1.4 - Automatically restarts the server during development.

## Configuration

Configuration settings, including database credentials, are managed via environment variables. Ensure you have a `.env` file in your root directory with the necessary variables.

## Documentation

API documentation is automatically generated and available via Swagger UI. Access the documentation at:

```
http://localhost:3000/api-docs
```

## Examples

Here are some example API requests:

- **User Registration:**

  ```bash
  POST /registration
  {
    "email": "user@nutech-integrasi.com",
    "first_name": "User",
    "last_name": "Nutech",
    "password": "abcdef1234"
  }
  ```

- **User Login:**

  ```bash
  POST /login
  {
    "email": "user@nutech-integrasi.com",
    "password": "abcdef1234"
  }
  ```

## Troubleshooting

- **Database Connection Issues:** Ensure that your database credentials are correct and that the MySQL server is running.
- **Environment Variables:** Double-check that all necessary environment variables are defined in your `.env` file.

## Contributors

- [Marfin](https://github.com/marfindev)

## License

This project is licensed under the ISC License.

---

Feel free to modify any sections as needed, especially under **Contributors** and **License**. If you have any additional details or sections you'd like to include, let me know!