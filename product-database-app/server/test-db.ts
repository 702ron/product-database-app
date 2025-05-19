import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  try {
    // Try to connect
    console.log("Attempting to connect to the database...");
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Connection successful:", result);

    // Try to fetch users
    console.log("Attempting to fetch users...");
    try {
      const users = await prisma.user.findMany();
      console.log("Users found:", users.length);
      console.log("User data:", users);
    } catch (userErr) {
      console.error("Error fetching users:", userErr);
    }

    // Try to create a user
    console.log("Attempting to create a user...");
    try {
      const user = await prisma.user.create({
        data: {
          username: "testuser2",
          email: "test2@example.com",
          passwordHash: "$2a$10$dummyhash2",
          role: "EDITOR",
        },
      });
      console.log("User created:", user);
    } catch (createErr) {
      console.error("Error creating user:", createErr);
    }
  } catch (e) {
    console.error("Connection failed. Full error:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
