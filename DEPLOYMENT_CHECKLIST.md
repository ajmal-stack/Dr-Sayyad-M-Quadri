# 🚀 Vercel Deployment Checklist

## Your Deployment URLs
- **Frontend**: https://smq.techuniqueiit.com/
- **Backend**: https://dr-sayyad-m-quadri-backend.vercel.app/
- **API**: https://dr-sayyad-m-quadri-backend.vercel.app/api/v1

---

## ✅ Pre-Deployment Setup

### 1. MongoDB Atlas
- [ ] Account created
- [ ] Free M0 cluster created
- [ ] Database user created (username + password)
- [ ] IP whitelist set to `0.0.0.0/0`
- [ ] Connection string obtained
- [ ] Connection string tested locally

### 2. Cloudinary
- [ ] Account created
- [ ] Cloud name obtained
- [ ] API key obtained
- [ ] API secret obtained
- [ ] Upload settings configured

### 3. Email (Optional)
- [ ] Gmail 2FA enabled
- [ ] App password generated
- [ ] SMTP credentials ready

---

## 🔧 Backend Deployment

### Configuration Files
- [x] `backend/vercel.json` - Updated with CORS headers
- [x] `backend/.env.example` - Updated with production URLs
- [ ] `backend/.env` - Local environment variables set

### Environment Variables in Vercel
Go to: **Vercel Dashboard → dr-sayyad-m-quadri-backend → Settings → Environment Variables**

#### Required (Must Set)
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `API_VERSION=v1`
- [ ] `MONGODB_URI` - Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] `JWT_REFRESH_SECRET` - Different from JWT_SECRET
- [ ] `CLIENT_URL=https://smq.techuniqueiit.com`
- [ ] `ALLOWED_ORIGINS=https://smq.techuniqueiit.com,http://localhost:3000`
- [ ] `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_KEY` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_SECRET` - From Cloudinary dashboard

#### Recommended
- [ ] `JWT_EMAIL_SECRET` - For email verification
- [ ] `JWT_RESET_SECRET` - For password reset
- [ ] `JWT_ACCESS_EXPIRE=7d`
- [ ] `JWT_REFRESH_EXPIRE=30d`
- [ ] `BCRYPT_SALT_ROUNDS=12`
- [ ] `SESSION_SECRET` - Random string
- [ ] `RATE_LIMIT_WINDOW_MS=900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS=100`
- [ ] `TRUST_PROXY=1`
- [ ] `ADMIN_EMAIL=admin@drquadri.com`
- [ ] `ADMIN_PASSWORD` - Strong password
- [ ] `ADMIN_NAME=Dr. Syed M Quadri`

#### Optional (Email)
- [ ] `SMTP_HOST=smtp.gmail.com`
- [ ] `SMTP_PORT=587`
- [ ] `SMTP_USER` - Your Gmail
- [ ] `SMTP_PASS` - Gmail app password
- [ ] `FROM_EMAIL` - Sender email
- [ ] `FROM_NAME=Dr. Syed M Quadri`

### Deployment Steps
- [ ] All environment variables set in Vercel
- [ ] Redeploy backend from Vercel dashboard
- [ ] Check deployment logs for errors
- [ ] Test health endpoint: https://dr-sayyad-m-quadri-backend.vercel.app/health
- [ ] Verify response shows "healthy" status

---

## 🌐 Frontend Deployment

### Configuration Files
- [x] `client/vercel.json` - Created with API rewrites
- [ ] `client/.env.local` - Local environment variables (for development)

### Environment Variables in Vercel
Go to: **Vercel Dashboard → Frontend Project → Settings → Environment Variables**

#### Required
- [ ] `NEXT_PUBLIC_API_URL=https://dr-sayyad-m-quadri-backend.vercel.app/api/v1`

### Deployment Steps
- [ ] Environment variable set in Vercel
- [ ] Redeploy frontend from Vercel dashboard
- [ ] Check build logs for errors
- [ ] Visit https://smq.techuniqueiit.com/
- [ ] Verify site loads without errors

---

## 🗄️ Database Seeding

### After Backend is Deployed

#### Option 1: Local Seeding (Recommended)
```bash
# Pull production environment variables
cd backend
vercel env pull .env.production

# Run seed scripts
npm run seed:admin
npm run seed:blogs
npm run seed:treatments
```

#### Option 2: Create Seed Endpoint
- [ ] Create authenticated seed endpoint
- [ ] Call endpoint to seed database
- [ ] Verify data in MongoDB Atlas

### Verify Database
- [ ] Login to MongoDB Atlas
- [ ] Check `dr-quadri` database exists
- [ ] Verify collections: users, blogs, books, podcasts, treatments
- [ ] Check data is populated

---

## 🧪 Testing & Verification

### Backend Tests
- [ ] Health check: `curl https://dr-sayyad-m-quadri-backend.vercel.app/health`
- [ ] API root: `curl https://dr-sayyad-m-quadri-backend.vercel.app/`
- [ ] Blogs API: `curl https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/blogs`
- [ ] Books API: `curl https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/books`
- [ ] Treatments API: `curl https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/treatments`

### Frontend Tests
- [ ] Homepage loads: https://smq.techuniqueiit.com/
- [ ] About page: https://smq.techuniqueiit.com/about
- [ ] Books page: https://smq.techuniqueiit.com/books
- [ ] Podcast page: https://smq.techuniqueiit.com/podcast
- [ ] Admin login: https://smq.techuniqueiit.com/admin/login
- [ ] Admin dashboard: https://smq.techuniqueiit.com/admin/dashboard

### CORS Test
Open browser console on https://smq.techuniqueiit.com/ and run:
```javascript
fetch('https://dr-sayyad-m-quadri-backend.vercel.app/api/v1/blogs')
  .then(r => r.json())
  .then(data => console.log('✅ CORS working:', data))
  .catch(err => console.error('❌ CORS error:', err))
```

### Functionality Tests
- [ ] Images load correctly (Cloudinary)
- [ ] Navigation works between pages
- [ ] Search functionality works
- [ ] Filters work (books, blogs)
- [ ] Pagination works
- [ ] Mobile responsive design
- [ ] No console errors in browser

### Authentication Tests
- [ ] Admin login works
- [ ] Admin dashboard accessible
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] JWT tokens working

### Admin Panel Tests
- [ ] Blog management (CRUD)
- [ ] Book management (CRUD)
- [ ] Podcast management (CRUD)
- [ ] Treatment management (CRUD)
- [ ] Image uploads work
- [ ] Search and filters work

---

## 🔍 Monitoring

### Vercel Dashboard
- [ ] Check deployment status (both projects)
- [ ] Review function logs for errors
- [ ] Monitor bandwidth usage
- [ ] Check build times

### MongoDB Atlas
- [ ] Monitor database connections
- [ ] Check storage usage
- [ ] Review slow queries
- [ ] Set up alerts

### Cloudinary
- [ ] Check storage usage
- [ ] Monitor bandwidth
- [ ] Review transformations

---

## 🐛 Troubleshooting

### If Backend Health Check Fails
1. Check Vercel deployment logs
2. Verify MongoDB connection string
3. Check MongoDB Atlas IP whitelist
4. Verify all required environment variables are set
5. Redeploy backend

### If Frontend Can't Connect
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend is responding
3. Check CORS configuration
4. Clear browser cache
5. Check browser console for errors

### If CORS Errors Occur
1. Verify `ALLOWED_ORIGINS` includes frontend URL
2. Check `vercel.json` headers configuration
3. Ensure no trailing slashes in URLs
4. Redeploy backend after changes

### If Authentication Fails
1. Verify JWT secrets are set
2. Check `CLIENT_URL` matches frontend exactly
3. Clear browser cookies
4. Check token expiration settings

### If Images Don't Load
1. Verify Cloudinary credentials
2. Check Cloudinary dashboard
3. Test image upload manually
4. Check browser network tab for errors

---

## 📊 Performance Checks

### Backend Performance
- [ ] Response time < 500ms for API calls
- [ ] Database queries optimized
- [ ] Compression enabled
- [ ] Rate limiting working

### Frontend Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized (Next.js Image)
- [ ] Code splitting working
- [ ] Lighthouse score > 90

### SEO
- [ ] Meta tags present
- [ ] Open Graph tags set
- [ ] Sitemap generated
- [ ] Robots.txt configured

---

## 🔐 Security Checks

### Backend Security
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting active
- [ ] Helmet.js security headers
- [ ] JWT secrets are strong and unique
- [ ] Admin password is strong

### Frontend Security
- [ ] HTTPS enabled
- [ ] No sensitive data in client code
- [ ] API keys use `NEXT_PUBLIC_` prefix only when needed
- [ ] XSS protection enabled

### Database Security
- [ ] Strong database password
- [ ] IP whitelist configured
- [ ] Connection string not exposed
- [ ] Regular backups enabled

---

## 📝 Documentation

### Update Documentation
- [ ] README.md with deployment info
- [ ] API documentation
- [ ] Environment variables documented
- [ ] Troubleshooting guide
- [ ] Admin user guide

### Team Communication
- [ ] Share deployment URLs
- [ ] Share admin credentials (securely)
- [ ] Document any custom configurations
- [ ] Create runbook for common tasks

---

## 🎉 Post-Deployment

### Immediate Actions
- [ ] Test all critical functionality
- [ ] Monitor logs for first 24 hours
- [ ] Set up error alerts
- [ ] Create backup of environment variables
- [ ] Document any issues encountered

### Within First Week
- [ ] Monitor performance metrics
- [ ] Review error logs
- [ ] Optimize slow queries
- [ ] Set up analytics
- [ ] Plan regular maintenance

### Ongoing Maintenance
- [ ] Weekly log reviews
- [ ] Monthly security updates
- [ ] Quarterly secret rotation
- [ ] Regular database backups
- [ ] Performance monitoring

---

## 🆘 Emergency Contacts

### Vercel Support
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Status: https://www.vercel-status.com/

### MongoDB Atlas
- Dashboard: https://cloud.mongodb.com/
- Support: https://www.mongodb.com/cloud/atlas/support

### Cloudinary
- Dashboard: https://cloudinary.com/console
- Support: https://support.cloudinary.com/

---

## ✅ Final Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Database connected and seeded
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Authentication working
- [ ] Images loading from Cloudinary
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Admin panel working
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Monitoring set up
- [ ] Documentation complete

---

## 🎊 Deployment Complete!

**Your website is live at:**
- **Frontend**: https://smq.techuniqueiit.com/
- **Backend API**: https://dr-sayyad-m-quadri-backend.vercel.app/api/v1
- **Admin Panel**: https://smq.techuniqueiit.com/admin

**Congratulations! 🎉**

---

**Last Updated:** October 24, 2025
**Status:** Ready for Production
