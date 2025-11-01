# Authentication System - Complete Setup Guide

## Overview
A comprehensive authentication system with email verification, user registration with detailed profiles, availability scheduling, and project type management.

## Features Implemented

### 1. **User Registration System**
- **Multi-step Registration Form** (`/auth/register`)
  - Personal Information (First Name, Last Name)
  - Contact Details (Email, Phone Number)
  - Professional Information (Experience Field, About Yourself)
  - Project Type Selection (Multiple choice checkboxes)
  - Social Media Accounts (Facebook, Twitter, Instagram, LinkedIn, Custom Links)
  - Availability Scheduling (Calendar-like slots with date/time ranges)

### 2. **Email Verification**
- Users register but cannot login until they verify their email
- Verification link sent to email with 24-hour expiry
- Beautiful HTML email template with branding
- Token-based verification system

### 3. **Password Setup**
- Separate password setup page (`/auth/setup-password`)
- Password strength indicator (Weak/Medium/Strong)
- Show/hide password toggle
- Minimum 8 characters requirement
- Confirmation password matching

### 4. **Authentication**
- NextAuth.js integration for secure authentication
- JWT-based session management
- 30-day session duration
- Secure password hashing with bcrypt (12 rounds)

### 5. **Admin Features**
- Project Types Management (`/admin/project-types`)
- Create, view, and delete project types
- Users can select multiple project types during registration

## Database Schema

### Models Created:

#### **User**
```prisma
- id: UUID
- firstName, lastName: String
- email: Unique String
- phoneNumber: String
- experienceField: String
- aboutYourself: Optional Text
- password: Optional (null until verified)
- isVerified: Boolean
- role: String (user/admin)
- Social media: facebook, twitter, instagram, linkedin, otherLinks
- timestamps: createdAt, updatedAt
- Relations: projectTypes[], availability[], verificationTokens[]
```

#### **ProjectType**
```prisma
- id: UUID
- name: Unique String
- description: Optional
- isActive: Boolean
- order: Int (for sorting)
- timestamps: createdAt, updatedAt
- Relations: users[] (many-to-many)
```

#### **Availability**
```prisma
- id: UUID
- userId: String
- startDate, endDate: DateTime
- startTime, endTime: String (HH:MM format)
- dayOfWeek: Optional
- notes: Optional
- timestamps: createdAt, updatedAt
```

#### **VerificationToken**
```prisma
- id: UUID
- userId: String
- token: Unique UUID
- type: String (registration/password_reset)
- expiresAt: DateTime (24 hours from creation)
- used: Boolean
- createdAt: DateTime
```

## API Endpoints

### Authentication APIs

1. **POST /api/auth/register**
   - Register new user
   - Sends verification email
   - Returns: userId, success message

2. **GET /api/auth/setup-password?token={token}**
   - Verify registration token
   - Returns: user info if valid

3. **POST /api/auth/setup-password**
   - Set user password
   - Marks token as used
   - Marks user as verified
   - Body: `{ token, password }`

4. **POST /api/auth/[...nextauth]**
   - NextAuth.js authentication
   - Credentials provider (email/password)
   - Returns: JWT session

### Project Types APIs

1. **GET /api/project-types**
   - List all active project types
   - Returns: Array of project types

2. **POST /api/project-types**
   - Create new project type (admin)
   - Body: `{ name, description }`

3. **DELETE /api/project-types/[id]**
   - Delete project type (admin)

## Setup Instructions

### 1. Environment Configuration

Update `/Users/ahmadsaleh/articles-dashboard/.env`:

```env
# Database (Already configured)
DATABASE_URL="file:/Users/ahmadsaleh/articles-dashboard/prisma/dev.db"

# NextAuth (Already configured with secure secret)
NEXTAUTH_URL="http://localhost:3004"
NEXTAUTH_SECRET="Aa7dS14U1JyDSlV7g6Ortq0FDEiE15V7agtD/J/wcXQ="

# Email Configuration (CONFIGURE THIS)
SMTP_HOST="smtp.gmail.com"  # Your SMTP host
SMTP_PORT="587"              # Your SMTP port
SMTP_SECURE="false"          # true for 465, false for other ports
SMTP_USER="your-email@gmail.com"        # Your email
SMTP_PASSWORD="your-app-password"       # Gmail App Password
SMTP_FROM="your-email@gmail.com"        # From address
```

### 2. Email Setup (Gmail Example)

For Gmail:
1. Go to Google Account Settings
2. Enable 2-Step Verification
3. Generate App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Use this App Password in `SMTP_PASSWORD`

For other providers (SendGrid, Mailgun, AWS SES):
- Update `SMTP_HOST`, `SMTP_PORT` according to provider docs
- Use API keys or SMTP credentials as `SMTP_PASSWORD`

### 3. Database Setup (Already Done)

The database has been:
- ✅ Schema updated with all models
- ✅ Migrated using `prisma db push`
- ✅ Seeded with 8 sample project types

Project types created:
1. Web Development
2. Mobile App Development
3. UI/UX Design
4. DevOps & Infrastructure
5. Data Science & AI
6. Content Writing
7. Digital Marketing
8. Quality Assurance

## Usage Guide

### For Users:

1. **Register**
   - Visit: http://localhost:3004/auth/register
   - Fill in all required fields
   - Select project types you're interested in
   - Add availability slots
   - Submit registration

2. **Email Verification**
   - Check your email inbox
   - Click the verification link (valid for 24 hours)
   - You'll be redirected to set password page

3. **Set Password**
   - Enter a strong password (min 8 characters)
   - Confirm password
   - Submit

4. **Login**
   - Visit: http://localhost:3004/auth/login
   - Enter email and password
   - Access the dashboard

### For Admins:

1. **Manage Project Types**
   - Visit: http://localhost:3004/admin/project-types
   - Add new project types
   - Delete existing ones
   - View all project types

## File Structure

```
/src
  /app
    /api
      /auth
        /register/route.ts          # User registration
        /setup-password/route.ts    # Password setup
        /[...nextauth]/route.ts     # NextAuth config
      /project-types
        /route.ts                   # List/Create project types
        /[id]/route.ts              # Delete project types
    /auth
      /register/page.tsx            # Registration form
      /setup-password/page.tsx      # Password setup page
      /login/page.tsx               # Login page
      /registration-success/page.tsx # Success page
    /admin
      /project-types/page.tsx       # Admin project types mgmt
  /lib
    /email.ts                       # Email sending utilities
    /prisma.ts                      # Prisma client
  /types
    /next-auth.d.ts                 # NextAuth type definitions
/prisma
  /schema.prisma                    # Database schema
  /seed.ts                          # Database seeder
  /dev.db                           # SQLite database
```

## Testing the System

### 1. Test Registration Flow:

```bash
# Visit registration page
open http://localhost:3004/auth/register

# Or use curl to test API:
curl -X POST http://localhost:3004/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "experienceField": "Software Development",
    "aboutYourself": "Experienced developer",
    "projectTypeIds": ["<project-type-id>"],
    "availability": [
      {
        "startDate": "2025-11-01",
        "endDate": "2025-11-30",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }'
```

### 2. Check Email:
- Email will be sent to the provided address
- Click verification link
- Complete password setup

### 3. Test Login:
```bash
# Visit login page
open http://localhost:3004/auth/login

# Or test with curl (after obtaining session):
curl -X POST http://localhost:3004/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "your-password"
  }'
```

## Security Features

1. **Password Security**
   - Bcrypt hashing with 12 rounds
   - Minimum 8 characters
   - Password strength indicator

2. **Email Verification**
   - Token-based verification
   - 24-hour expiry
   - One-time use tokens

3. **Session Management**
   - JWT-based sessions
   - 30-day expiration
   - Secure secret key

4. **Input Validation**
   - Required field validation
   - Email format validation
   - Duplicate email prevention

## Troubleshooting

### Email Not Sending:
1. Check SMTP credentials in `.env`
2. Verify SMTP host and port
3. For Gmail, ensure App Password is generated
4. Check console logs for error messages

### Token Expired:
- Tokens expire after 24 hours
- User needs to register again
- Consider implementing token refresh

### Database Issues:
```bash
# Reset database
npx prisma db push --force-reset

# Reseed database
npx tsx prisma/seed.ts
```

### NextAuth Issues:
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

## Next Steps / Enhancements

1. **Password Reset Flow**
   - Add "Forgot Password" link
   - Create password reset API
   - Send password reset emails

2. **Email Templates**
   - Welcome email after verification
   - Password reset email
   - Account updates notifications

3. **User Profile Management**
   - Edit profile page
   - Update availability
   - Change password

4. **Admin Dashboard**
   - View all users
   - Manage user roles
   - Analytics and statistics

5. **OAuth Integration**
   - Google Sign-In
   - GitHub Sign-In
   - Social authentication

## Support & Resources

- NextAuth.js Docs: https://next-auth.js.org
- Prisma Docs: https://www.prisma.io/docs
- Nodemailer Docs: https://nodemailer.com
- Gmail App Passwords: https://support.google.com/accounts/answer/185833

## Server Status

✅ **System Ready**
- Server: http://localhost:3004
- Database: Seeded and ready
- Auth: Configured
- Email: Needs SMTP configuration

**Current Status:** All systems operational, awaiting email configuration for full functionality.
