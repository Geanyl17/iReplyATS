# iReplyATS Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ireplyats"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Database Setup

1. **Install PostgreSQL** if you haven't already
2. **Create a database** named `ireplyats`
3. **Update the DATABASE_URL** in your `.env` file with your database credentials

## Generate Prisma Client

Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

## Database Migration

Run the following command to create the database tables:

```bash
npx prisma db push
```

## Start the Development Server

```bash
npm run dev
```

## Features Implemented

- ✅ Next.js App Router setup
- ✅ NextAuth.js authentication
- ✅ User registration and login
- ✅ Protected dashboard
- ✅ Prisma database integration
- ✅ Responsive UI with Tailwind CSS

## Pages Available

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Protected dashboard (requires authentication)

## Next Steps

1. Set up your database and environment variables
2. Run the development server
3. Test the registration and login flow
4. Customize the UI and add more features as needed 