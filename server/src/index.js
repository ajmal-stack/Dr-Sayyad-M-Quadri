import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy settings - Required for rate limiting behind proxies
// Set to true if behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// Set to 1 if you know the number of proxies in front of your app
app.set('trust proxy', process.env.TRUST_PROXY || 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 login attempts per windowMs
  message: {
    error:
      'Too many login attempts from this IP, please try again after 15 minutes.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Dr. Syed M Quadri Server API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authLimiter, (await import('./routes/auth.js')).default);
app.use('/api/books', (await import('./routes/books.js')).default);
app.use('/api/podcasts', (await import('./routes/podcasts.js')).default);
app.use('/api/contact', (await import('./routes/contact.js')).default);
app.use('/api/upload', (await import('./routes/upload.js')).default);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong!',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Trust proxy setting: ${app.get('trust proxy')}`);
  console.log(
    `⏱️  Rate limit: ${
      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    } requests per ${
      (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 60000
    } minutes`
  );
  console.log(
    `🔐 Auth rate limit: ${
      parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5
    } requests per ${
      (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 60000
    } minutes`
  );
});
