# Environment Variables Configuration

## 🔐 Backend Environment Variables

### Required for Vercel Deployment

Copy these to **Vercel Dashboard → Backend Project → Settings → Environment Variables**

```bash
# ==========================================
# REQUIRED VARIABLES
# ==========================================

# Server Configuration
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dr-quadri?retryWrites=true&w=majority

# JWT Secrets - GENERATE STRONG RANDOM STRINGS!
# Use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters-here
JWT_EMAIL_SECRET=your-email-verification-secret-min-32-characters
JWT_RESET_SECRET=your-password-reset-secret-min-32-characters

# JWT Expiration Times
JWT_ACCESS_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Client URL - Your Frontend Domain
CLIENT_URL=https://smq.techuniqueiit.com

# CORS Configuration - Comma-separated list of allowed origins
ALLOWED_ORIGINS=https://smq.techuniqueiit.com,http://localhost:3000

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# ==========================================
# RECOMMENDED VARIABLES
# ==========================================

# Email Configuration (for password reset, notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
FROM_EMAIL=noreply@drsyedquadri.com
FROM_NAME=Dr. Syed M Quadri

# Security
BCRYPT_SALT_ROUNDS=12
SESSION_SECRET=your-session-secret-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX_REQUESTS=5
TRUST_PROXY=1

# Admin Account (for initial setup)
ADMIN_EMAIL=admin@drquadri.com
ADMIN_PASSWORD=your-secure-admin-password-here
ADMIN_NAME=Dr. Syed M Quadri

# ==========================================
# OPTIONAL VARIABLES
# ==========================================

# Logging
LOG_LEVEL=info

# File Upload
MAX_FILE_SIZE=10485760
CLOUDINARY_FOLDER=dr-quadri

# External APIs
YOUTUBE_API_KEY=your-youtube-api-key
GOOGLE_ANALYTICS_ID=your-ga-id

# Redis (if using caching)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password
REDIS_TTL=3600
```

---

## 🌐 Frontend Environment Variables

### Required for Vercel Deployment

Copy this to **Vercel Dashboard → Frontend Project → Settings → Environment Variables**

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://dr-sayyad-m-quadri-backend.vercel.app/api/v1
```

### For Local Development

Create `client/.env.local` file:

```bash
# API Configuration (Local Backend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 🔑 How to Generate Secure Secrets

### Method 1: Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Method 2: OpenSSL
```bash
openssl rand -hex 32
```

### Method 3: Online Generator
- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" section
- Generate multiple keys for different secrets

---

## 📝 Setting Environment Variables in Vercel

### Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard

2. **Select Your Project**
   - Backend: `dr-sayyad-m-quadri-backend`
   - Frontend: Your frontend project

3. **Navigate to Settings**
   - Click on **Settings** tab
   - Click on **Environment Variables** in sidebar

4. **Add Variables**
   - Click **Add New**
   - Enter **Name** (e.g., `MONGODB_URI`)
   - Enter **Value** (e.g., your MongoDB connection string)
   - Select **Environment**: Production (or All)
   - Click **Save**

5. **Repeat for All Variables**

6. **Redeploy**
   - Go to **Deployments** tab
   - Click latest deployment
   - Click **Redeploy**

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to project
cd backend
vercel link

# Add environment variables
vercel env add MONGODB_URI production
# Paste value when prompted

# Or add from file
vercel env pull .env.production
# Edit .env.production
vercel env push .env.production production
```

---

## 🗄️ MongoDB Atlas Setup

### 1. Create Cluster
1. Go to https://cloud.mongodb.com/
2. Sign up or login
3. Click **Build a Database**
4. Select **FREE** (M0 Shared)
5. Choose cloud provider and region (closest to your users)
6. Name your cluster (e.g., `dr-quadri-cluster`)
7. Click **Create**

### 2. Create Database User
1. Click **Database Access** in sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `drquadri_admin` (or your choice)
5. Password: Generate strong password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 3. Whitelist IP Addresses
1. Click **Network Access** in sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. IP Address: `0.0.0.0/0` (for Vercel)
5. Comment: "Vercel Deployment"
6. Click **Confirm**

### 4. Get Connection String
1. Click **Database** in sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `dr-quadri` (or your database name)

**Example:**
```
mongodb+srv://drquadri_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/dr-quadri?retryWrites=true&w=majority
```

---

## ☁️ Cloudinary Setup

### 1. Create Account
1. Go to https://cloudinary.com/
2. Sign up for free account
3. Verify email

### 2. Get Credentials
1. Go to Dashboard: https://cloudinary.com/console
2. Find **Account Details** section
3. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Configure Settings (Optional)
1. Go to **Settings** → **Upload**
2. Enable **Unsigned uploading** if needed
3. Set upload presets

### 4. Add to Environment Variables
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
```

---

## 📧 Email Configuration (Gmail)

### 1. Enable 2-Factor Authentication
1. Go to Google Account: https://myaccount.google.com/
2. Click **Security**
3. Enable **2-Step Verification**

### 2. Generate App Password
1. Go to **Security** → **2-Step Verification**
2. Scroll to **App passwords**
3. Click **App passwords**
4. Select app: **Mail**
5. Select device: **Other (Custom name)**
6. Name it: "Dr Quadri Backend"
7. Click **Generate**
8. Copy the 16-character password

### 3. Add to Environment Variables
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Dr. Syed M Quadri
```

---

## ✅ Verification Checklist

### Backend Variables
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` - Valid MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Strong random string (32+ characters)
- [ ] `JWT_REFRESH_SECRET` - Different from JWT_SECRET
- [ ] `CLIENT_URL` - Matches frontend domain exactly
- [ ] `ALLOWED_ORIGINS` - Includes frontend domain
- [ ] `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_KEY` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
- [ ] `ADMIN_EMAIL` - Valid email address
- [ ] `ADMIN_PASSWORD` - Strong password

### Frontend Variables
- [ ] `NEXT_PUBLIC_API_URL` - Points to backend API endpoint

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string tested

### Cloudinary
- [ ] Account created
- [ ] Credentials obtained
- [ ] Upload settings configured

---

## 🐛 Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Verify MongoDB URI is correct
- Check IP whitelist includes `0.0.0.0/0`
- Ensure password doesn't contain special characters (URL encode if needed)
- Test connection string locally first

### Issue: "JWT malformed" or "Invalid token"
**Solution:**
- Verify JWT_SECRET is set correctly
- Ensure JWT_SECRET is same across all deployments
- Check token expiration settings
- Clear browser cookies and try again

### Issue: "Cloudinary upload failed"
**Solution:**
- Verify all three Cloudinary variables are set
- Check credentials are correct (no extra spaces)
- Test with Cloudinary dashboard upload
- Check file size limits

### Issue: "Email not sending"
**Solution:**
- Verify Gmail app password (not regular password)
- Check 2FA is enabled on Google account
- Verify SMTP settings are correct
- Test with a simple email first

---

## 🔄 Updating Environment Variables

### After Changing Variables

1. **Save Changes** in Vercel Dashboard
2. **Redeploy** the application:
   - Go to Deployments tab
   - Click latest deployment
   - Click "Redeploy"
3. **Verify** changes took effect:
   - Check deployment logs
   - Test affected functionality

### Best Practices

- ✅ Never commit `.env` files to Git
- ✅ Use different values for development and production
- ✅ Document all custom variables
- ✅ Rotate secrets periodically (every 90 days)
- ✅ Use strong, random values for secrets
- ✅ Test locally before deploying to production
- ✅ Keep backup of production variables (securely)

---

## 📚 Additional Resources

- **Vercel Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary**: https://cloudinary.com/documentation
- **Gmail App Passwords**: https://support.google.com/accounts/answer/185833
- **JWT Best Practices**: https://jwt.io/introduction

---

**Last Updated:** October 24, 2025
