import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set in your .env file.");
  process.exit(1);
}

const client = new Client({ connectionString });

client
  .connect()
  .then(() => {
    console.log("✅ Successfully connected to the database!");
    return client.end();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:");
    console.error(err.message);
    process.exit(1);
  });
