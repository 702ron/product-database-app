# Product Database Application

A full-stack web application for managing product information and images with robust user authentication and role-based permissions. Now with complete Progressive Web App (PWA) capabilities!

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
- Progressive Web App (PWA) features:
  - Offline functionality
  - Install as native app
  - App updates with What's New guides
  - Platform-specific installation guides
  - Caching strategies

## Tech Stack

### Frontend

- React 19
- TypeScript
- Material UI (MUI)
- React Router
- React Hook Form
- Axios
- Service Workers
- Web App Manifest

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
 ├── client/                # React frontend
 │   ├── public/            # Static assets
 │   │   ├── manifest.json  # Web App Manifest
 │   │   └── service-worker.js  # Service Worker
 │   └── src/               # Source code
 │       ├── components/    # React components
 │       │   ├── AppLayout.tsx                     # Main app layout
 │       │   ├── PWAInstallPrompt.tsx              # Installation prompt
 │       │   ├── ServiceWorkerUpdateNotification.tsx  # Update notification
 │       │   └── WhatsNewDialog.tsx                # What's New dialog
 │       └── serviceWorkerRegistration.ts          # Service worker registration
 ├── scripts/               # Utility scripts
 │   ├── create-manifest.js     # Manifest generator
 │   ├── validate-manifest.js   # Manifest validator
 │   └── generate-screenshot.js # Screenshot generator
 ├── server/                # Express backend API
 ├── docker-compose.yml     # Docker configuration
 ├── MANIFEST-UPDATES.md    # PWA manifest documentation
 └── README.md              # Project documentation
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

## PWA Features

The application has been enhanced with Progressive Web App capabilities:

### Installation Experience

- Custom install prompts with platform-specific guidance
- Native app experience after installation
- App shortcuts for quick access to key features
- Designed for both mobile and desktop platforms

### Offline Capability

- Service worker for caching static assets and API responses
- Offline fallback page when no connection is available
- Cached resources for continued use without network

### Update Management

- Streamlined update process with step-by-step guidance
- "What's New" dialog after updates
- Non-disruptive update notifications

### Manifest Tools

Scripts have been created to help manage the web app manifest:

- `validate-manifest.js` - Validates manifest against PWA requirements
- `create-manifest.js` - Creates/updates manifest with best practices
- `generate-screenshot.js` - Generates screenshots for the manifest

See `MANIFEST-UPDATES.md` for detailed information about manifest enhancements.

## API Documentation

The backend provides RESTful API endpoints for:

- Authentication (/api/auth/\*)
- Product management (/api/products/\*)
- Image handling (/api/images/\*)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project was developed based on requirements outlined in the product database plan and follows modern web development best practices.
