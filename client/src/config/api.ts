/**
 * API Configuration
 * Centralized API configuration for the frontend
 */

export const API_CONFIG = {
  // Backend API URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  
  // API Version
  VERSION: 'v1',
  
  // Full API Base URL
  get API_BASE_URL() {
    return `${this.BASE_URL}/api/${this.VERSION}`;
  },
  
  // Endpoints
  ENDPOINTS: {
    // System
    HEALTH: '/health',
    API_INFO: '/',
    V1_INFO: '/api/v1',
    V1_TEST: '/api/v1/test',
    
    // Books
    BOOKS: '/api/v1/books',
    BOOKS_FEATURED: '/api/v1/books/featured',
    BOOKS_BESTSELLERS: '/api/v1/books/bestsellers',
    BOOKS_CATEGORIES: '/api/v1/books/categories',
    BOOKS_STATS: '/api/v1/books/stats',
    BOOKS_SEARCH: '/api/v1/books/search',
    BOOKS_BY_CATEGORY: (category: string) => `/api/v1/books/category/${encodeURIComponent(category)}`,
    BOOKS_BY_ID: (id: string) => `/api/v1/books/${id}`,
    BOOKS_TEST: '/api/v1/books/test',
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export default API_CONFIG;
