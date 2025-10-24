# 🚀 Quick Start - Vercel Deployment

## Your URLs
- **Frontend**: https://smq.techuniqueiit.com/
- **Backend**: https://dr-sayyad-m-quadri-backend.vercel.app/
- **API**: https://dr-sayyad-m-quadri-backend.vercel.app/api/v1

---

## ⚡ 5-Minute Setup

### Step 1: Set Backend Environment Variables (2 min)

Go to: **Vercel Dashboard → dr-sayyad-m-quadri-backend → Settings → Environment Variables**

**Copy and paste these (replace with your actual values):**

```bash
NODE_ENV=production
PORT=5000
API_VERSION=v1
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=generate-with-command-below
JWT_REFRESH_SECRET=generate-different-secret
CLIENT_URL=https://smq.techuniqueiit.com
ALLOWED_ORIGINS=https://smq.techuniqueiit.com,http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_EMAIL=admin@drquadri.com
ADMIN_PASSWORD=your-strong-password
TRUST_PROXY=1
```

**Generate JWT secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Set Frontend Environment Variable (30 sec)

Go to: **Vercel Dashboard → Frontend Project → Settings → Environment Variables**

```bash
NEXT_PUBLIC_API_URL=https://dr-sayyad-m-quadri-backend.vercel.app/api/v1
```

### Step 3: Redeploy Both Projects (1 min)

1. **Backend**: Deployments → Latest → Redeploy
2. **Frontend**: Deployments → Latest → Redeploy

### Step 4: Verify (1 min)

**Test backend:**
```bash
curl https://dr-sayyad-m-quadri-backend.vercel.app/health
```

**Test frontend:**
Visit: https://smq.techuniqueiit.com/

### Step 5: Seed Database (30 sec)

```bash
cd backend
vercel env pull .env.production
npm run seed:admin
npm run seed:blogs
```

---

## ✅ Done!

Your site is now live and configured! 🎉

**Next steps:**
1. Test admin login: https://smq.techuniqueiit.com/admin/login
2. Review full documentation: `VERCEL_DEPLOYMENT_COMPLETE.md`
3. Complete checklist: `DEPLOYMENT_CHECKLIST.md`

---

## 🆘 Quick Troubleshooting

### Backend not responding?
- Check environment variables are set
- Verify MongoDB URI is correct
- Check deployment logs in Vercel

### Frontend can't connect?
- Verify `NEXT_PUBLIC_API_URL` is set
- Check CORS configuration
- Clear browser cache

### CORS errors?
- Ensure `ALLOWED_ORIGINS` includes your frontend URL
- Redeploy backend after changes

---

## 📚 Full Documentation

- **Complete Guide**: `VERCEL_DEPLOYMENT_COMPLETE.md`
- **Environment Variables**: `ENVIRONMENT_VARIABLES.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`

---

**Need help?** Check the full documentation files for detailed instructions.
