# Production Setup Guide

This guide will help you deploy your Articles Dashboard to production.

## Overview

You have:
- ✅ Domain from GoDaddy
- ✅ Google Workspace connected to your domain
- ✅ Mailtrap configured for production email sending

## Table of Contents

1. [Environment Setup](#1-environment-setup)
2. [Email Configuration (Mailtrap)](#2-email-configuration-mailtrap)
3. [Database Setup](#3-database-setup)
4. [Deployment Options](#4-deployment-options)
5. [Security Checklist](#5-security-checklist)
6. [Post-Deployment](#6-post-deployment)

---

## 1. Environment Setup

### Create Production Environment File

Create a `.env.production` file (copy from `.env.production.example`):

```bash
cp .env.production.example .env.production
```

**IMPORTANT:** Never commit `.env.production` to Git. Make sure it's in `.gitignore`.

### Generate a Secure NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` in `.env.production`.

### Update Your Domain

Replace `NEXTAUTH_URL` with your actual domain:

```env
NEXTAUTH_URL="https://yourdomain.com"
```

---

## 2. Email Configuration (Mailtrap)

You already have Mailtrap set up! Here's your configuration:

### Mailtrap Production Settings

```env
SMTP_HOST="live.smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="api"
SMTP_PASSWORD="YOUR_MAILTRAP_API_TOKEN"
SMTP_FROM="noreply@yourdomain.com"
EMAIL_FROM_NAME="Articles Dashboard"
```

### Get Your Mailtrap API Token

1. Go to: https://mailtrap.io/sending
2. Click **"Domains"** → Select your domain
3. Click **"API Tokens"**
4. Copy your production API token
5. Add it to `.env.production` as `SMTP_PASSWORD`

### Verify Your Domain in Mailtrap

To send emails from your domain:

1. Go to Mailtrap → **Sending Domains**
2. Click **"Add Domain"** or select your existing domain
3. Add the following DNS records to your GoDaddy DNS:

   **SPF Record (TXT):**
   ```
   v=spf1 include:_spf.mailtrap.io ~all
   ```

   **DKIM Record (TXT):**
   ```
   (Copy from Mailtrap dashboard)
   ```

   **DMARC Record (TXT):**
   ```
   v=DMARC1; p=none;
   ```

4. Wait for DNS propagation (can take up to 48 hours, usually faster)
5. Click **"Verify"** in Mailtrap

**Note:** Once verified, you can send emails from `noreply@yourdomain.com`, `hello@yourdomain.com`, etc.

---

## 3. Database Setup

**IMPORTANT:** SQLite is NOT recommended for production. Use PostgreSQL or MySQL.

### Option A: PostgreSQL (Recommended)

#### Using a Database Provider:

**Neon (Recommended - Free tier available):**
1. Go to: https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Add to `.env.production`:
   ```env
   DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"
   ```

**Supabase (Alternative - Free tier):**
1. Go to: https://supabase.com
2. Create a project
3. Go to Settings → Database → Connection string
4. Copy the connection string
5. Add to `.env.production`

**Railway (Alternative - Pay as you go):**
1. Go to: https://railway.app
2. Create a PostgreSQL database
3. Copy connection string
4. Add to `.env.production`

#### Update Prisma Schema

Your `prisma/schema.prisma` already uses PostgreSQL-compatible syntax, so no changes needed.

#### Run Migrations

```bash
# Set the production database URL
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Seed the database (if needed)
npx tsx prisma/seed.ts
```

### Option B: MySQL

If you prefer MySQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Use a MySQL provider:
   - PlanetScale: https://planetscale.com
   - Railway: https://railway.app
   - Digital Ocean: https://www.digitalocean.com/products/managed-databases

3. Update `.env.production`:
   ```env
   DATABASE_URL="mysql://user:pass@host:3306/dbname"
   ```

---

## 4. Deployment Options

### Option A: Vercel (Recommended - Easiest)

**Pros:** Easy deployment, free tier, automatic HTTPS, CDN, serverless

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables:**
   - Go to: https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **Environment Variables**
   - Add all variables from `.env.production`:
     - `DATABASE_URL`
     - `NEXTAUTH_URL`
     - `NEXTAUTH_SECRET`
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_USER`
     - `SMTP_PASSWORD`
     - `SMTP_FROM`
     - `EMAIL_FROM_NAME`

5. **Connect Your Custom Domain:**
   - Go to **Settings** → **Domains**
   - Add your GoDaddy domain
   - Follow the DNS instructions
   - Update GoDaddy DNS with Vercel's records

6. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Option B: Railway

**Pros:** Easy deployment, includes database, automatic HTTPS

**Steps:**

1. Go to: https://railway.app
2. Connect your GitHub repository
3. Add PostgreSQL service (Railway will create one)
4. Set environment variables
5. Deploy

### Option C: DigitalOcean App Platform

**Pros:** Full control, managed infrastructure

**Steps:**

1. Go to: https://cloud.digitalocean.com/apps
2. Create a new app
3. Connect GitHub repository
4. Add database component
5. Set environment variables
6. Deploy

### Option D: VPS (Advanced)

If you want full control, deploy to a VPS:

- DigitalOcean Droplet
- AWS EC2
- Linode
- Vultr

**Requirements:**
- Node.js 18+
- PostgreSQL or MySQL
- Nginx (reverse proxy)
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

---

## 5. Security Checklist

Before going live, ensure:

### Environment Variables
- [ ] `NEXTAUTH_SECRET` is a strong, unique secret (32+ characters)
- [ ] `.env.production` is NOT committed to Git
- [ ] All sensitive credentials are stored securely

### Database
- [ ] Using PostgreSQL or MySQL (not SQLite)
- [ ] Database has strong password
- [ ] Database uses SSL connection
- [ ] Regular backups are configured

### Email
- [ ] Domain is verified in Mailtrap
- [ ] SPF, DKIM, DMARC records are set
- [ ] `SMTP_FROM` matches your verified domain

### Application
- [ ] HTTPS is enabled (automatic with Vercel/Railway)
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (if needed)
- [ ] Error logging is set up

### DNS (GoDaddy)
- [ ] A record points to your hosting provider
- [ ] CNAME for www subdomain (if using)
- [ ] Email DNS records (SPF, DKIM, DMARC)

---

## 6. Post-Deployment

### Test Everything

1. **Registration Flow:**
   - Register a new user
   - Check email arrives (to real email)
   - Complete password setup
   - Login

2. **Authentication:**
   - Login/logout works
   - Session persists
   - Protected routes redirect to login

3. **Email Delivery:**
   - Registration emails arrive
   - Emails don't go to spam
   - Links in emails work correctly

### Monitor

Set up monitoring:

- **Application:** Use Vercel Analytics or Sentry
- **Database:** Monitor query performance
- **Email:** Check Mailtrap dashboard for delivery rates

### Backup

Set up regular backups:

- **Database:** Automated backups (most providers offer this)
- **Files:** If storing uploads, backup S3/storage

---

## Quick Start: Vercel Deployment

The fastest way to get to production:

### 1. Prepare Database

```bash
# Create database on Neon or Supabase
# Copy connection string
```

### 2. Create .env.production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
SMTP_HOST="live.smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_USER="api"
SMTP_PASSWORD="your-mailtrap-token"
SMTP_FROM="noreply@yourdomain.com"
EMAIL_FROM_NAME="Articles Dashboard"
```

### 3. Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Add Environment Variables in Vercel

Go to Vercel dashboard → Project → Settings → Environment Variables

### 5. Connect Custom Domain

Vercel → Project → Settings → Domains → Add your domain

### 6. Update GoDaddy DNS

Add records provided by Vercel

### 7. Run Database Migrations

```bash
DATABASE_URL="your-prod-db-url" npx prisma migrate deploy
```

### 8. Test!

Visit your domain and test the full registration/login flow.

---

## Troubleshooting

### Email Not Sending

- Check Mailtrap dashboard for errors
- Verify domain DNS records
- Check `SMTP_FROM` matches verified domain
- Check API token is correct

### Database Connection Failed

- Check DATABASE_URL format
- Ensure SSL is enabled (add `?sslmode=require`)
- Check database credentials
- Verify IP whitelist (if applicable)

### Domain Not Working

- Wait for DNS propagation (up to 48 hours)
- Use https://dnschecker.org to verify
- Clear browser cache
- Check Vercel/Railway domain settings

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Mailtrap Docs: https://help.mailtrap.io/
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma Production: https://www.prisma.io/docs/guides/deployment

---

## Summary

**Development:**
- Use MailHog for local email testing
- Use SQLite for local database

**Production:**
- Use Mailtrap for real email sending
- Use PostgreSQL for production database
- Deploy to Vercel/Railway for easy setup
- Connect custom domain from GoDaddy
- Set up DNS records for email authentication

Good luck with your deployment! 🚀
