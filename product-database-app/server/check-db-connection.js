"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("DATABASE_URL is not set in your .env file.");
    process.exit(1);
}
const client = new pg_1.Client({ connectionString });
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
