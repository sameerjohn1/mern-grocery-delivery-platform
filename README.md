# FreshMart: Grocery Delivery Platform (MERN Stack)

A full stack grocery delivery platform with a customer storefront and a separate admin dashboard. The REST API is built with Node.js, Express and MongoDB, following a layered architecture.

**Status:** Backend in progress. Frontend and payments coming next.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, role-based access control
- **Media:** Cloudinary (image uploads)
- **API Testing:** Postman
- **Planned:** React.js, Stripe, email verification

## Architecture

backend/
├── config/        # Database and Cloudinary configuration
├── controllers/   # Request and response handling
├── middleware/    # Auth, admin access, file upload
├── models/        # Mongoose schemas (User, Product, Category)
├── routes/        # Endpoint mapping
├── utils/         # Helper functions
└── server.js      # App entry point

## Features (Implemented)

- User authentication with JWT
- Role-based access (customer and admin)
- Product CRUD with image upload to Cloudinary
- Category management
- Protected admin routes

## Roadmap

- [ ] Customer storefront (React)
- [ ] Admin dashboard (React)
- [ ] Cart and delivery address
- [ ] Order placement and status tracking
- [ ] Cash on delivery and Stripe payments
- [ ] Email verification

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/users/register | Public | Register a new user |
| POST | /api/users/login | Public | Login and receive JWT |
| GET | /api/products | Public | List all products |
| POST | /api/products | Admin | Add a product |
| GET | /api/categories | Public | List categories |
| POST | /api/categories | Admin | Add a category |

(Update this table with your actual routes.)

## Getting Started

1. Clone the repo
   git clone https://github.com/sameerjohn1/mern-grocery-delivery-platform.git
2. Install dependencies
   cd backend && npm install
3. Create a `.env` file in `backend/`:
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
4. Start the server
   npm run dev

### Seed admin dashboard demo data

From `backend/`, run `npm run seed:demo` to add sample customers, products,
categories, hookahs, carts, and orders. The seed can be run repeatedly without
duplicating its demo records. Remote MongoDB targets are refused unless
explicitly confirmed with `npm run seed:demo -- --allow-remote`; never use this
option for a production database.

## Author

**Sameer**, Full Stack Developer (React, Next.js, Node.js, MongoDB)
Lahore, Pakistan
Email: sameerprogrammer5@gmail.com
