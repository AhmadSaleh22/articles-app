# 🚀 Backend System - Nakbah Archive

Complete backend system for the articles dashboard with PostgreSQL, Prisma ORM, and NextAuth authentication.

## 📊 Database Schema

### User Management
- **User** - User accounts with authentication
- **ProjectType** - Available project types for users
- **UserProjectType** - Many-to-many relationship
- **Availability** - User availability schedules
- **VerificationToken** - Email verification tokens

### Content Management
- **Category** - Content categories (History, Culture, etc.)
- **Tag** - Content tags
- **Contributor** - Article contributors
- **Article** - Main content (supports: standard, video, audio, gallery)
- **ArticleContributor** - Many-to-many with roles
- **ArticleTag** - Many-to-many with tags
- **ArticleMedia** - Article media attachments
- **Thread** - Article threads/series
- **Collection** - Curated article collections
- **CollectionItem** - Articles in collections
- **Trip** - Location-based article journeys
- **TripArticle** - Articles in trips

### Media Management
- **Media** - File uploads (images, videos, audio)

### Engagement
- **Comment** - Article comments with threading
- **Like** - Article likes
- **View** - Article view tracking

### Submissions
- **Submission** - User-submitted content
- **OpenCall** - Active submission calls

## 🔧 Tech Stack

- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 6.18.0
- **Authentication**: NextAuth 4.24.12
- **Password Hashing**: bcryptjs
- **Runtime**: Next.js 16 with App Router

## 🗄️ API Routes

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (login, logout, session)

### Articles
- `GET /api/articles` - List articles with filters
  - Query params: `page`, `limit`, `status`, `type`, `categoryId`, `isFeatured`, `search`
- `POST /api/articles` - Create new article
- `GET /api/articles/[slug]` - Get article by slug
- `PUT /api/articles/[slug]` - Update article
- `DELETE /api/articles/[slug]` - Delete article

## 🌱 Sample Data

The database has been seeded with:
- 2 Users (1 admin, 1 regular user)
- 2 Categories (History, Culture)
- 2 Tags (Nakba, Jerusalem)
- 1 Contributor
- 1 Thread
- 2 Articles (1 standard, 1 video)
- 1 Collection
- 1 Trip

### Test Credentials
```
Email: admin@nakbaharchive.com
Password: password123
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file based on `.env.example`:
```bash
DATABASE_URL="your-neon-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Migrations
```bash
DATABASE_URL="your-url" npx prisma db push
```

### 5. Seed Database
```bash
DATABASE_URL="your-url" npx tsx prisma/seed.ts
```

### 6. Start Development Server
```bash
npm run dev
```

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # NextAuth handler
│       └── articles/route.ts             # Articles API
├── lib/
│   ├── prisma.ts                        # Prisma client
│   ├── auth.ts                          # NextAuth config
│   └── utils/
│       ├── api-response.ts              # API response helpers
│       └── slug.ts                      # Slug generation utils
prisma/
├── schema.prisma                        # Database schema
└── seed.ts                              # Seed script
```

## 🔐 Authentication

NextAuth is configured with:
- Credentials provider (email/password)
- JWT strategy
- Session management
- Email verification required
- Password hashing with bcrypt

## 📝 Article Types

The system supports 4 article types:

1. **Standard** - Text articles with images
2. **Video** - Video articles with player
3. **Audio** - Audio articles with waveform
4. **Gallery** - Image carousel articles

## 🎯 Key Features

- ✅ Full CRUD operations for articles
- ✅ User authentication with NextAuth
- ✅ Multi-type article support (standard, video, audio, gallery)
- ✅ Category and tag management
- ✅ Article threading
- ✅ Collections and trips
- ✅ Contributors management
- ✅ Engagement tracking (views, likes, comments)
- ✅ Submission system
- ✅ Search and filtering
- ✅ Pagination support

## 🔄 Next Steps

To complete the backend:

1. **Create remaining API routes**:
   - Collections API (`/api/collections`)
   - Trips API (`/api/trips`)
   - Users/Profile API (`/api/users`)
   - Media upload API (`/api/upload`)
   - Comments API (`/api/comments`)
   - Tags/Categories API

2. **Add middleware**:
   - Authentication middleware
   - Role-based access control
   - Rate limiting

3. **Implement file uploads**:
   - Image upload for articles
   - Video/audio upload
   - File storage (local or cloud)

4. **Add validation**:
   - Input validation with Zod
   - Request validation middleware

5. **Enhance security**:
   - CSRF protection
   - Input sanitization
   - SQL injection prevention

## 📚 Database Commands

```bash
# View database in browser
npx prisma studio

# Create a new migration
DATABASE_URL="your-url" npx prisma migrate dev --name migration_name

# Reset database
DATABASE_URL="your-url" npx prisma db push --force-reset

# Generate Prisma Client
npx prisma generate
```

## 🐛 Troubleshooting

### Prisma Client Not Generated
```bash
npx prisma generate
```

### Database Connection Issues
- Check your DATABASE_URL in .env
- Ensure Neon database is accessible
- Verify SSL mode is set correctly

### Migration Conflicts
```bash
rm -rf prisma/migrations
DATABASE_URL="your-url" npx prisma db push
```

## 📖 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Next.js App Router](https://nextjs.org/docs/app)
