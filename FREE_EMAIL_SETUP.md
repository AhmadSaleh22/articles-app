# Free & Local Email Setup Guide

This guide shows you **completely free** alternatives to Gmail SMTP for sending emails in your Articles Dashboard application.

## 🎯 Best Free Options

### 1. **Mailtrap** (Recommended for Development)
- **Free Tier**: 1,000 emails/month, 1 domain, 1 user
- **Perfect for**: Development and testing
- **Setup**: Just sign up and get API token

#### Option A: Mailtrap API (Recommended)
```env
MAILTRAP_TOKEN=your-api-token-here
SMTP_FROM=hello@demomailtrap.co
EMAIL_FROM_NAME="Articles Dashboard"
```

#### Option B: Mailtrap SMTP (Alternative)
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=test@example.com
EMAIL_FROM_NAME="Articles Dashboard"
```

**Get Started:**
1. Go to [mailtrap.io](https://mailtrap.io)
2. Sign up for free
3. **For API**: Go to "Email Sending" → "API Tokens" → Create new token
4. **For SMTP**: Go to "Email Testing" → "Inboxes" → "My Inbox" → Copy SMTP credentials

### 2. **Ethereal Email** (Completely Free)
- **Free Tier**: Unlimited emails for testing
- **Perfect for**: Development and testing
- **Setup**: Generate credentials instantly

```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ethereal-username
SMTP_PASSWORD=your-ethereal-password
SMTP_FROM=test@ethereal.email
EMAIL_FROM_NAME="Articles Dashboard"
```

**Get Started:**
1. Go to [ethereal.email](https://ethereal.email)
2. Click "Create Ethereal Account"
3. Copy the generated credentials

### 3. **MailHog** (Local Development)
- **Free**: 100% free, runs locally
- **Perfect for**: Local development
- **Setup**: Install and run locally

```env
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=test@localhost
EMAIL_FROM_NAME="Articles Dashboard"
```

**Install & Run:**
```bash
# Install MailHog
go install github.com/mailhog/MailHog@latest

# Run MailHog
MailHog
```

Then visit `http://localhost:8025` to see captured emails.

### 4. **smtp4dev** (Local Development)
- **Free**: 100% free, runs locally
- **Perfect for**: Windows development
- **Setup**: Download and run

```env
SMTP_HOST=localhost
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=test@localhost
```

**Get Started:**
1. Download from [smtp4dev](https://github.com/rnwood/smtp4dev)
2. Run the application
3. It will start on `http://localhost:5000`

## 🚀 Quick Setup Instructions

### Option 1: Mailtrap (Easiest)
1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Create a `.env.local` file:
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-username-here
SMTP_PASSWORD=your-password-here
SMTP_FROM=test@yourdomain.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
DATABASE_URL="file:./dev.db"
```
3. Restart your app: `npm run dev`

### Option 2: Ethereal Email (No Signup Required)
1. Go to [ethereal.email](https://ethereal.email)
2. Click "Create Ethereal Account"
3. Copy the credentials to your `.env.local`
4. Restart your app

### Option 3: Local MailHog (Completely Offline)
1. Install MailHog:
```bash
# macOS
brew install mailhog

# Or with Go
go install github.com/mailhog/MailHog@latest
```
2. Run MailHog: `mailhog`
3. Update your `.env.local`:
```env
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=test@localhost
EMAIL_FROM_NAME="Articles Dashboard"
```
4. Visit `http://localhost:8025` to see emails
5. Restart your app

## 📧 Production-Ready Free Options

### SendGrid (Free Tier)
- **Free Tier**: 100 emails/day forever
- **Perfect for**: Small production apps

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=your-verified-email@domain.com
```

### Mailgun (Free Tier)
- **Free Tier**: 5,000 emails/month for 3 months
- **Perfect for**: Production apps

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-smtp-username
SMTP_PASSWORD=your-mailgun-smtp-password
SMTP_FROM=your-verified-email@domain.com
```

## 🔧 Testing Your Setup

After configuring any option, test it by:

1. **Start your app**: `npm run dev`
2. **Try to register a new user** (this will trigger an email)
3. **Check your email inbox**:
   - Mailtrap: Check the Mailtrap dashboard
   - Ethereal: Check the Ethereal dashboard
   - MailHog: Visit `http://localhost:8025`
   - smtp4dev: Check the smtp4dev interface

**Note**: Make sure your `.env` file is in your project root directory and contains your email configuration.

## 🚨 Troubleshooting

### Error: "550 Invalid syntax in MAIL command"
This means your email address format is invalid. Make sure:

1. **SMTP_FROM** contains a valid email address like `test@example.com`
2. **SMTP_USER** contains a valid email address (if using authentication)
3. **No special characters** or spaces in email addresses
4. **Use proper format**: `user@domain.com` (not `user@domain` or `user domain`)

**Fix:**
```env
# ✅ Correct
SMTP_FROM=test@example.com
SMTP_USER=your-username@example.com

# ❌ Wrong
SMTP_FROM=test@domain
SMTP_USER=invalid email
```

**Important**: Make sure your `.env` file is in your project root directory (same level as `package.json`).

### Error: "Authentication failed"
- Check your SMTP_USER and SMTP_PASSWORD
- For Ethereal Email, make sure you copied the credentials correctly
- For Mailtrap, verify you're using the sandbox credentials

### Error: "Connection refused"
- Make sure the SMTP service is running (for local options like MailHog)
- Check your SMTP_HOST and SMTP_PORT settings
- Verify your internet connection (for online services)

## 🎉 Recommended Setup

For **development**: Use **Mailtrap** or **Ethereal Email**
For **local testing**: Use **MailHog** or **smtp4dev**
For **production**: Use **SendGrid** or **Mailgun** free tiers

All of these options are completely free and don't require any payment information!
