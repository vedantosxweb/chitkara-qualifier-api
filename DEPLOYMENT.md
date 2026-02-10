# Deployment Guide - Step by Step

## Prerequisites
- GitHub account
- Google Gemini API key (from https://aistudio.google.com)

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name it: `chitkara-qualifier-api`
4. Make it **PUBLIC**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your project directory:

```bash
git init
git add .
git commit -m "Initial commit - Chitkara Qualifier API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chitkara-qualifier-api.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Render (RECOMMENDED)

### Why Render?
- Free tier available
- Easy setup
- Auto-deploys on git push
- Reliable uptime

### Steps:

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**
   - Click "Connect account" for GitHub
   - Select your `chitkara-qualifier-api` repository

4. **Configure Service**
   - **Name:** chitkara-qualifier-api (or any name)
   - **Region:** Choose closest to India (Singapore recommended)
   - **Branch:** main
   - **Root Directory:** leave blank
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. **Environment Variables**
   - Click "Advanced"
   - Click "Add Environment Variable"
   - **Key:** GEMINI_API_KEY
   - **Value:** [Your Gemini API key from Google AI Studio]

6. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Once deployed, you'll get a URL like: `https://chitkara-qualifier-api.onrender.com`

7. **Test Your APIs**
   ```
   POST: https://your-app.onrender.com/bfhl
   GET:  https://your-app.onrender.com/health
   ```

## Alternative: Deploy to Railway

1. **Sign Up**
   - Go to https://railway.app
   - Sign in with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `chitkara-qualifier-api` repository

3. **Add Environment Variable**
   - Click on your service
   - Go to "Variables" tab
   - Add: `GEMINI_API_KEY=your_key`

4. **Deploy**
   - Railway auto-deploys
   - Click "Settings" → "Generate Domain" to get public URL

## Alternative: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variable**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Paste your Gemini API key when prompted

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

## Verify Deployment

Test both endpoints:

```bash
# Health check
curl https://your-deployed-url.com/health

# Fibonacci test
curl -X POST https://your-deployed-url.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'
```

## Get Your Gemini API Key

1. Visit https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key" in left sidebar
4. Click "Create API key in new project" (or select existing)
5. Copy the API key
6. Add it to your deployment platform's environment variables

## Final Submission URLs

After deployment, you'll have:

1. **POST /bfhl URL:** `https://your-app.onrender.com/bfhl`
2. **GET /health URL:** `https://your-app.onrender.com/health`
3. **GitHub Repository:** `https://github.com/YOUR_USERNAME/chitkara-qualifier-api`
4. **Hosting Platform:** Render (or Railway/Vercel)

## Troubleshooting

### API not responding
- Check if environment variable `GEMINI_API_KEY` is set
- Check deployment logs on your platform
- Verify the API is running (check /health endpoint)

### AI endpoint failing
- Verify Gemini API key is valid
- Check if you have API quota remaining
- Check deployment logs for error messages

### Deployment failed
- Ensure package.json has correct start script
- Check Node.js version (should be >= 18)
- Verify all dependencies are in package.json

## Support

If you encounter issues:
1. Check deployment platform logs
2. Test locally first with `npm start`
3. Verify all environment variables are set
4. Check that repository is public

---

Good luck with your qualifier! 🚀
