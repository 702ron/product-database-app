# Product Database Application

A full-stack web application for managing product information and images with robust user authentication and role-based permissions.

## Project Overview

This application allows internal staff to manage product inventory including product details and associated images. It features a modern React frontend with Material UI components and a Node.js/Express backend with PostgreSQL database.

### Key Features

- Product management (CRUD operations)
- Multiple image storage per product
- User authentication and authorization
- Conditional form fields based on product status
- Search and filtering capabilities
- Modal-based image gallery system
- Role-based access control

## Tech Stack

### Frontend

- React 19
- TypeScript
- Material UI (MUI)
- React Router
- React Hook Form
- Axios

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL with Prisma ORM
- JWT authentication
- Multer for file uploads

### Infrastructure

- Docker for containerization
- PostgreSQL database
- RESTful API architecture

## Project Structure

```
product-database-app/
 ├── client/         # React frontend
 ├── server/         # Express backend API
 ├── docker-compose.yml    # Docker configuration
 └── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL
- Docker and Docker Compose (optional)

### Setting Up the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/702ron/product-database-app.git
   cd product-database-app
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   cp .env.example .env  # Configure your environment variables
   npx prisma migrate dev --name init
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd client
   npm install
   # Set REACT_APP_API_URL in .env if needed
   npm start
   ```

4. **Using Docker (Optional)**
   ```bash
   docker-compose up
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend API at [http://localhost:4000](http://localhost:4000).

## Database Schema

The application uses PostgreSQL with the following core tables:

- Users - Authentication and authorization
- Products - Core product information
- ProductImages - Images associated with products

See `server/prisma/schema.prisma` for the complete database schema.

## API Documentation

The backend provides RESTful API endpoints for:

- Authentication (/api/auth/\*)
- Product management (/api/products/\*)
- Image handling (/api/images/\*)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project was developed based on requirements outlined in the product database plan and follows modern web development best practices.
