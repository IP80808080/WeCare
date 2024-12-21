# WeCare

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm
- Git

## Installation

1. Fork the Repository and always check for the newly commit by using git pull from origin master

2. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

3. Install dependencies:
```bash
npm install or npm i
# or
yarn install
```

## Environment Setup

1. Create two environment files in the root directory:

#### only use port 5432 (port starting with 6... gives problem)

`.env` - For database configuration:
```plaintext
# Connect to Supabase via connection pooling with Supavisor
DATABASE_URL="postgresql://[YOUR_POSTGRES_USER]:[YOUR_POSTGRES_PASSWORD]@[YOUR_POOLER_HOST]:5432/postgres?pgbouncer=true"

# Direct connection to the database (for migrations)
DIRECT_URL="postgresql://[YOUR_POSTGRES_USER]:[YOUR_POSTGRES_PASSWORD]@[YOUR_HOST]:5432/postgres"
```

`.env.local` - For Next.js and Supabase configuration:
```plaintext
NEXT_PUBLIC_AUTHROUTE="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="[YOUR_SUPABASE_URL]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_SUPABASE_ANON_KEY]"
NEXT_PUBLIC_JWT_SECRET="[YOUR_JWT_SECRET]"
```

> ⚠️ **Important**: Never commit these files to version control. They contain sensitive information.

## Prisma Setup

1. Initialize Prisma in your project:
```bash
npx prisma init
```

2. Pull the existing database schema
```bash
npx prisma db pull
```

3. Run database migrations:
```bash
npx prisma migrate dev --name init
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Additional Commands

- Format Prisma schema:
```bash
npx prisma format
```

- View database in Prisma Studio:
```bash
npx prisma studio
```

## Project Structure

```
├── prisma/
│   └── schema.prisma
├── src/
├── .env
├── .env.local
└── ... other files
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Security Notes

- Never share your `.env` or `.env.local` files
- Don't commit sensitive credentials to version control
- Keep your JWT secret secure
- Regularly rotate your database credentials

## Support

For any additional help or questions, please reach out to the project maintainers.
