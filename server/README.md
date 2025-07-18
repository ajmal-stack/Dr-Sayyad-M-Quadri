# Dr. Syed M Quadri - Server

Backend API server for Dr. Syed M Quadri's website.

## Features

- ✅ Express.js REST API
- ✅ MongoDB integration with Mongoose
- ✅ Cloudinary file upload integration
- ✅ CORS enabled for cross-origin requests
- ✅ Rate limiting for API protection
- ✅ Security headers with Helmet
- ✅ Request compression
- ✅ Environment variable configuration
- ✅ Error handling middleware
- ✅ Health check endpoint
- ✅ File upload middleware with validation
- ✅ Database seeding scripts

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB installed locally OR MongoDB Atlas account
- Cloudinary account for file uploads

### Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL

```
http://localhost:5000
```

### Available Routes

#### General

- `GET /` - API information
- `GET /health` - Health check

#### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/category/:category` - Get books by category

#### Podcasts

- `GET /api/podcasts` - Get all podcasts
- `GET /api/podcasts/:id` - Get podcast by ID
- `GET /api/podcasts/search?q=query` - Search podcasts

#### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact/info` - Get contact information

## Environment Variables

| Variable     | Description           | Default               |
| ------------ | --------------------- | --------------------- |
| `PORT`       | Server port           | 5000                  |
| `NODE_ENV`   | Environment           | development           |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm run build` - Build project (placeholder)
- `npm test` - Run tests (placeholder)

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js   # MongoDB configuration
│   │   └── cloudinary.js # Cloudinary configuration
│   ├── models/
│   │   ├── Book.js       # Book schema and model
│   │   ├── Podcast.js    # Podcast schema and model
│   │   └── Contact.js    # Contact schema and model
│   ├── middleware/
│   │   └── upload.js     # File upload middleware
│   ├── routes/
│   │   ├── books.js      # Books API routes
│   │   ├── podcasts.js   # Podcasts API routes
│   │   ├── contact.js    # Contact API routes
│   │   └── upload.js     # File upload routes
│   ├── scripts/
│   │   └── seedData.js   # Database seeding script
│   └── index.js          # Main server file
├── .env                  # Environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development

The server uses ES modules (type: "module" in package.json) and includes:

- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **Cloudinary**: Cloud-based image and video management
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Rate limiting**: API protection
- **Compression**: Response compression
- **Nodemon**: Development auto-restart

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- Security headers via Helmet
- CORS protection
- Request size limits
- Error handling without exposing stack traces in production

## Setup Instructions

### MongoDB Setup

**Option 1: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/dr-quadri-db`

**Option 2: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Get connection string and update `.env`

### Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. Update `.env` with your credentials

## Future Enhancements

- [x] ~~Database integration (MongoDB/PostgreSQL)~~
- [x] ~~File upload handling~~
- [ ] Authentication & JWT
- [ ] Email service integration
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Real-time features with Socket.io
- [ ] Redis caching
- [ ] Payment integration
