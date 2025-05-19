# Product Database App - Backend

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**

   - Copy `.env.example` to `.env` and set your PostgreSQL connection string:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/productdb"
     ```

3. **Set up the database:**

   - Make sure PostgreSQL is running and a database named `productdb` exists.

4. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Scripts

- `npm run dev` — Start server with nodemon
- `npx prisma studio` — Open Prisma Studio for DB browsing
