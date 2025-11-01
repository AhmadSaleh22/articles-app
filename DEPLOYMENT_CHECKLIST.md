# Production Deployment Checklist

Use this checklist to ensure everything is configured correctly before deploying.

## Pre-Deployment

### 1. Domain & DNS Setup (GoDaddy)
- [ ] Domain purchased and active
- [ ] DNS management accessible
- [ ] Google Workspace connected (if using)

### 2. Email Setup (Mailtrap)
- [ ] Mailtrap account created
- [ ] Domain added to Mailtrap Sending Domains
- [ ] API Token generated and saved
- [ ] DNS records added to GoDaddy:
  - [ ] SPF record (TXT): `v=spf1 include:_spf.mailtrap.io ~all`
  - [ ] DKIM record (TXT) - from Mailtrap dashboard
  - [ ] DMARC record (TXT): `v=DMARC1; p=none;`
- [ ] Domain verified in Mailtrap
- [ ] Test email sent successfully

### 3. Database Setup
- [ ] Production database created (PostgreSQL recommended)
  - [ ] Neon.tech / Supabase / Railway / other
- [ ] Database connection string obtained
- [ ] Database connection tested
- [ ] SSL enabled on database connection

### 4. Environment Variables
- [ ] `.env.production` file created
- [ ] All required variables set:
  - [ ] `DATABASE_URL` (PostgreSQL connection string)
  - [ ] `NEXTAUTH_URL` (https://yourdomain.com)
  - [ ] `NEXTAUTH_SECRET` (generated with: `openssl rand -base64 32`)
  - [ ] `SMTP_HOST=live.smtp.mailtrap.io`
  - [ ] `SMTP_PORT=587`
  - [ ] `SMTP_USER=api`
  - [ ] `SMTP_PASSWORD` (Mailtrap API token)
  - [ ] `SMTP_FROM` (noreply@yourdomain.com)
  - [ ] `EMAIL_FROM_NAME` (Your App Name)

### 5. Code Preparation
- [ ] All code committed to Git
- [ ] `.env.production` NOT committed (verify in `.gitignore`)
- [ ] Database migrations created
- [ ] Build tested locally: `npm run build`
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## Deployment (Vercel - Recommended)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Initial Deployment
```bash
vercel
```

### 4. Configure Environment Variables
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Add all variables from `.env.production`:
  ```
  DATABASE_URL
  NEXTAUTH_URL
  NEXTAUTH_SECRET
  SMTP_HOST
  SMTP_PORT
  SMTP_USER
  SMTP_PASSWORD
  SMTP_FROM
  EMAIL_FROM_NAME
  ```
- [ ] Set environment to: **Production**

### 5. Run Database Migrations
```bash
# Use your production DATABASE_URL
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Seed database (if needed)
DATABASE_URL="your-production-url" npx tsx prisma/seed.ts
```

### 6. Production Deployment
```bash
vercel --prod
```

### 7. Connect Custom Domain
- [ ] Go to Vercel → Project → Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter your GoDaddy domain
- [ ] Copy the DNS records provided by Vercel
- [ ] Go to GoDaddy DNS settings
- [ ] Add/update DNS records:
  - **A Record**: @ → Vercel IP address
  - **CNAME Record**: www → your-project.vercel.app
- [ ] Wait for DNS propagation (use https://dnschecker.org)
- [ ] Verify domain is working

---

## Post-Deployment Testing

### 1. Application Access
- [ ] Visit https://yourdomain.com
- [ ] HTTPS is working (green padlock)
- [ ] No console errors
- [ ] Pages load correctly

### 2. Authentication Flow
- [ ] Home page redirects to login (not authenticated)
- [ ] Registration page loads
- [ ] Can register new user
- [ ] Registration email is sent
- [ ] Email arrives in real inbox (not spam)
- [ ] Password setup link works
- [ ] Can set password
- [ ] Can login with credentials
- [ ] Redirected to dashboard after login
- [ ] Session persists on refresh
- [ ] Can logout
- [ ] After logout, redirected to login

### 3. Email Testing
- [ ] Registration emails arrive within 1 minute
- [ ] Emails have correct branding
- [ ] Links in emails are correct (use production URL)
- [ ] Emails not marked as spam
- [ ] "From" address shows correctly

### 4. Database
- [ ] User data is saved correctly
- [ ] Topics can be created
- [ ] Articles can be created
- [ ] Data persists after server restart
- [ ] No connection errors in logs

### 5. Performance
- [ ] Pages load quickly (< 3 seconds)
- [ ] No timeout errors
- [ ] API responses are fast
- [ ] Images load correctly

---

## Security Verification

- [ ] HTTPS enabled on all pages
- [ ] Environment variables not exposed in client
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database connection uses SSL
- [ ] No sensitive data in console logs
- [ ] CORS configured correctly
- [ ] Rate limiting considered (if needed)

---

## Monitoring Setup

### Vercel Analytics (Built-in)
- [ ] Enabled in Vercel dashboard
- [ ] Monitoring page views
- [ ] Checking for errors

### Error Tracking (Optional but Recommended)
- [ ] Sentry account created
- [ ] Sentry integrated
- [ ] Test error sent and received

### Uptime Monitoring (Optional)
- [ ] UptimeRobot or similar configured
- [ ] Alerts set up for downtime

---

## Documentation

- [ ] Update README.md with production URL
- [ ] Document any custom configurations
- [ ] Note any known issues or limitations
- [ ] Create runbook for common operations

---

## Backup & Recovery

- [ ] Database backups enabled (automatic with most providers)
- [ ] Backup frequency set (daily recommended)
- [ ] Test database restore procedure
- [ ] Document recovery process

---

## Final Steps

- [ ] Announce launch to stakeholders
- [ ] Monitor application for first 24 hours
- [ ] Check email delivery rates
- [ ] Review error logs
- [ ] Celebrate! 🎉

---

## Quick Reference: Your Configuration

```env
# Production URLs
Website: https://yourdomain.com
Admin: https://yourdomain.com/admin

# Mailtrap
Dashboard: https://mailtrap.io/sending
SMTP: live.smtp.mailtrap.io:587

# Vercel
Dashboard: https://vercel.com/dashboard
Deployments: https://vercel.com/[your-project]/deployments

# Database
Provider: [Neon/Supabase/Railway/Other]
Dashboard: [Your database dashboard URL]
```

---

## Troubleshooting

### Email not sending
1. Check Mailtrap dashboard for errors
2. Verify DNS records in GoDaddy
3. Confirm domain is verified in Mailtrap
4. Check SMTP_FROM matches verified domain
5. Verify API token is correct

### Database connection errors
1. Check DATABASE_URL format
2. Ensure `?sslmode=require` is in connection string
3. Verify database credentials
4. Check IP whitelist in database provider

### Domain not working
1. Wait for DNS propagation (up to 48 hours)
2. Use https://dnschecker.org to verify
3. Clear browser cache
4. Check Vercel domain settings

### Authentication issues
1. Verify NEXTAUTH_URL is correct
2. Check NEXTAUTH_SECRET is set
3. Clear browser cookies
4. Check session configuration

---

## Support Resources

- Vercel: https://vercel.com/support
- Mailtrap: https://help.mailtrap.io/
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs

---

**Last Updated:** [Date]
**Deployed By:** [Your Name]
**Production URL:** https://yourdomain.com
