

# Speczone

## Overview

This project is a web application that provides specifications and reviews for various tech devices, including laptops and phones. It consists of a backend server built with Node.js and Express, and a frontend client built with React.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Laptops](#laptops)
  - [Categories](#categories)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login, signup, logout)
- Search for laptops and phones
- View detailed specifications and reviews
- Pagination for search results
- User profile management

## Project Structure

```bash
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   └── laptopController.js
│   ├── dummydata.js
│   ├── follower.json
│   ├── laptopmongo.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Category.js
│   │   ├── Laptop.js
│   │   └── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── laptopRoutes.js
│   ├── server.js
│   ├── test
│   │   └── auth.test.mjs
│   └── vercel.json
├── client
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── robots.txt
│   ├── src
│   │   ├── components
│   │   │   ├── About.jsx
│   │   │   ├── FeatureSection.js
│   │   │   ├── HomePage.js
│   │   │   ├── LaptopSearch.js
│   │   │   ├── Login.js
│   │   │   ├── PhoneSearch.js
│   │   │   ├── SignUp.js
│   │   │   ├── Teaser.js
│   │   │   └── UserProfile.js
│   │   ├── context
│   │   │   └── AuthContext.js
│   │   ├── index.js
│   └── README.md
├── package.json
└── README.md
```

## Installation

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and other environment variables:

   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

### Backend

To start the backend server:

```bash
npm run dev
```

### Frontend

To start the frontend development server:

```bash
npm start
```

Then open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Laptops

- `GET /api/laptops` - Get all laptops
- `GET /api/laptops/:id` - Get a single laptop by ID
- `POST /api/laptops` - Create a new laptop (admin only)
- `PUT /api/laptops/:id` - Update a laptop by ID (admin only)
- `DELETE /api/laptops/:id` - Delete a laptop by ID (admin only)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category by ID
- `POST /api/categories` - Create a new category (admin only)
- `PUT /api/categories/:id` - Update a category by ID (admin only)
- `DELETE /api/categories/:id` - Delete a category by ID (admin only)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

