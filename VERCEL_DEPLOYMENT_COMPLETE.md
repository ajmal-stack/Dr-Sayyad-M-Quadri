# Vercel Deployment Guide - Dr. Syed M Quadri Website

## 🌐 Deployment URLs

- **Frontend**: https://smq.techuniqueiit.com/
- **Backend**: https://dr-sayyad-m-quadri-backend.vercel.app/
- **Backend API**: https://dr-sayyad-m-quadri-backend.vercel.app/api/v1

---

## 📋 Quick Deployment Checklist

### ✅ Prerequisites Completed
- [x] Vercel account created
- [x] Projects created on Vercel
- [x] Custom domain configured (smq.techuniqueiit.com)
- [x] MongoDB Atlas cluster set up
- [x] Cloudinary account configured

### 🔧 Configuration Files Ready
- [x] Backend `vercel.json` - Configured with CORS headers
- [x] Frontend `vercel.json` - Configured with API rewrites
- [x] Backend `.env.example` - Updated with production URLs

---

## 🚀 Deployment Steps

### 1. Backend Deployment (Already Deployed)

Your backend is already deployed at: `https://dr-sayyad-m-quadri-backend.vercel.app/`

#### Environment Variables to Set in Vercel Dashboard

Go to: **Vercel Dashboard → dr-sayyad-m-quadri-backend → Settings → Environment Variables**

Add the following variables:

```bash
# Required Variables
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dr-quadri?retryWrites=true&w=majority

# JWT Secrets (Generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters
JWT_EMAIL_SECRET=your-email-verification-secret
JWT_RESET_SECRET=your-password-reset-secret

# JWT Expiration
JWT_ACCESS_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Client URL (Your Frontend)
CLIENT_URL=https://smq.techuniqueiit.com

# CORS Configuration
ALLOWED_ORIGINS=https://smq.techuniqueiit.com,http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@drsyedquadri.com

# Security
BCRYPT_SALT_ROUNDS=12
SESSION_SECRET=your-session-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
TRUST_PROXY=1

# Admin Account (for seeding)
ADMIN_EMAIL=admin@drquadri.com
ADMIN_PASSWORD=your-secure-admin-password
ADMIN_NAME=Dr. Syed M Quadri
```

#### After Setting Environment Variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Check deployment logs for any errors
4. Test the health endpoint: https://dr-sayyad-m-quadri-backend.vercel.app/health

---

### 2. Frontend Deployment (Already Deployed)

Your frontend is already deployed at: `https://smq.techuniqueiit.com/`

#### Environment Variables to Set in Vercel Dashboard

Go to: **Vercel Dashboard → smq-techuniqueiit → Settings → Environment Variables**

Add the following variable:

```bash
NEXT_PUBLIC_API_URL=https://dr-sayyad-m-quadri-backend.vercel.app/api/v1
```

#### After Setting Environment Variable:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for build to complete
4. Visit https://smq.techuniqueiit.com/ to verify

---

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster (If not done)
1. Go to https://cloud.mongodb.com/
2. Create a free M0 cluster
3. Create database user with username and password
4. Whitelist IP: `0.0.0.0/0` (Allow from anywhere for Vercel)
5. Get connection string

### 2. Seed Production Database

After backend is deployed with correct MONGODB_URI:

```bash
# Option 1: Use Vercel CLI locally
vercel env pull .env.production
npm run seed:admin
npm run seed:blogs
npm run seed:treatments

# Option 2: Create a seed endpoint (recommended for production)
# Call POST https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/seed
# (You'll need to create this endpoint with authentication)
```

---

## 🔍 Verification Steps

### 1. Backend Health Check
```bash
curl https://dr-sayyad-m-quadri-backend.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-24T...",
  "services": {
    "database": "connected",
    "cloudinary": "configured"
  }
}
```

### 2. Backend API Test
```bash
curl https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/blogs
```

### 3. Frontend Test
- Visit: https://smq.techuniqueiit.com/
- Check if data loads from backend
- Test navigation between pages
- Check browser console for errors

### 4. CORS Test
Open browser console on https://smq.techuniqueiit.com/ and run:
```javascript
fetch('https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/blogs')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

---

## 🔧 Configuration Files Explained

### Backend `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "https://smq.techuniqueiit.com" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ]
}
```

**Key Points:**
- Routes all requests to `src/index.js`
- Sets CORS headers for your frontend domain
- Enables all HTTP methods including OPTIONS for preflight

### Frontend `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://dr-sayyad-m-quadri-backend.vercel.app/api/:path*"
    }
  ]
}
```

**Key Points:**
- Configures Next.js build
- Rewrites `/api/*` requests to backend (optional, for cleaner URLs)

---

## 🐛 Troubleshooting

### Issue: CORS Errors
**Symptoms:** Browser console shows CORS policy errors

**Solutions:**
1. Verify `ALLOWED_ORIGINS` in backend environment variables includes `https://smq.techuniqueiit.com`
2. Check `vercel.json` headers configuration
3. Redeploy backend after changes
4. Clear browser cache

### Issue: 500 Internal Server Error
**Symptoms:** Backend returns 500 errors

**Solutions:**
1. Check Vercel deployment logs: Dashboard → Deployments → Click deployment → View Function Logs
2. Verify all required environment variables are set
3. Check MongoDB connection string is correct
4. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### Issue: Frontend Can't Connect to Backend
**Symptoms:** Frontend shows "Failed to fetch" or network errors

**Solutions:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend
2. Check backend is responding: https://dr-sayyad-m-quadri-backend.vercel.app/health
3. Check browser network tab for actual error
4. Verify CORS configuration

### Issue: Authentication Not Working
**Symptoms:** Login fails or tokens not working

**Solutions:**
1. Verify JWT secrets are set in backend environment variables
2. Check `CLIENT_URL` matches your frontend URL exactly
3. Verify cookies are being set (check browser DevTools → Application → Cookies)
4. Ensure `credentials: true` in CORS configuration

### Issue: Images Not Loading
**Symptoms:** Cloudinary images return 404 or errors

**Solutions:**
1. Verify Cloudinary environment variables are correct
2. Check Cloudinary dashboard for uploaded images
3. Test Cloudinary configuration: https://dr-sayyad-m-quadri-backend.vercel.app/health
4. Verify image URLs in database

---

## 📊 Monitoring & Logs

### View Backend Logs
1. Go to Vercel Dashboard
2. Select `dr-sayyad-m-quadri-backend` project
3. Click **Deployments**
4. Click on latest deployment
5. Click **View Function Logs**

### View Frontend Logs
1. Go to Vercel Dashboard
2. Select your frontend project
3. Click **Deployments**
4. Click on latest deployment
5. Check build logs and runtime logs

### Monitor Performance
- Vercel Analytics: Dashboard → Analytics
- Check response times and error rates
- Monitor bandwidth usage

---

## 🔄 Redeployment Process

### When to Redeploy

**Backend:**
- After changing environment variables
- After code changes
- After database schema changes

**Frontend:**
- After changing environment variables
- After code changes
- After updating API endpoints

### How to Redeploy

**Option 1: Automatic (Git Push)**
```bash
git add .
git commit -m "Update configuration"
git push origin main
```
Vercel will automatically detect and deploy

**Option 2: Manual (Vercel Dashboard)**
1. Go to Deployments tab
2. Find latest deployment
3. Click three dots (...)
4. Click **Redeploy**
5. Confirm redeployment

**Option 3: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd backend
vercel --prod

cd ../client
vercel --prod
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files to Git
- ✅ Use strong, random JWT secrets (min 32 characters)
- ✅ Rotate secrets periodically
- ✅ Use different secrets for development and production

### 2. Database Security
- ✅ Use strong MongoDB password
- ✅ Enable MongoDB Atlas IP whitelist
- ✅ Use connection string with `retryWrites=true&w=majority`
- ✅ Regular database backups

### 3. API Security
- ✅ Rate limiting enabled (100 requests per 15 minutes)
- ✅ Helmet.js for security headers
- ✅ CORS restricted to your domain
- ✅ JWT token expiration configured

### 4. Admin Account
- ✅ Change default admin password immediately
- ✅ Use strong password (min 12 characters, mixed case, numbers, symbols)
- ✅ Enable 2FA if available
- ✅ Limit admin access to trusted IPs

---

## 📈 Performance Optimization

### Backend
- ✅ Compression enabled
- ✅ Database connection pooling configured
- ✅ Rate limiting prevents abuse
- ✅ Cloudinary for image optimization

### Frontend
- ✅ Next.js automatic code splitting
- ✅ Image optimization with next/image
- ✅ Static generation where possible
- ✅ API route caching

---

## 🆘 Support & Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Cloudinary: https://cloudinary.com/documentation

### Vercel Support
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com (Pro/Enterprise plans)

### Project-Specific Help
- Check deployment logs first
- Review this documentation
- Test endpoints individually
- Check browser console for frontend errors

---

## ✅ Post-Deployment Checklist

- [ ] Backend health check returns "healthy"
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] Images load correctly
- [ ] Authentication works (login/logout)
- [ ] Admin panel accessible
- [ ] All pages load correctly
- [ ] Mobile responsive design works
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Database seeded with initial data
- [ ] Admin account created and tested
- [ ] Custom domain working (smq.techuniqueiit.com)
- [ ] SSL certificate active (HTTPS)
- [ ] Monitoring and logs accessible

---

## 🎉 Success!

Your Dr. Syed M Quadri website is now live on Vercel!

- **Frontend**: https://smq.techuniqueiit.com/
- **Backend API**: https://dr-sayyad-m-quadri-backend.vercel.app/api/v1
- **Admin Panel**: https://smq.techuniqueiit.com/admin

**Next Steps:**
1. Test all functionality thoroughly
2. Set up monitoring and alerts
3. Configure analytics
4. Plan regular backups
5. Document any custom configurations

---

**Last Updated:** October 24, 2025
**Version:** 1.0.0
