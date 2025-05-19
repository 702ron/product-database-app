"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Try to connect
            console.log("Attempting to connect to the database...");
            const result = yield prisma.$queryRaw `SELECT 1 as result`;
            console.log("Connection successful:", result);
            // Try to fetch users
            console.log("Attempting to fetch users...");
            try {
                const users = yield prisma.user.findMany();
                console.log("Users found:", users.length);
                console.log("User data:", users);
            }
            catch (userErr) {
                console.error("Error fetching users:", userErr);
            }
            // Try to create a user
            console.log("Attempting to create a user...");
            try {
                const user = yield prisma.user.create({
                    data: {
                        username: "testuser2",
                        email: "test2@example.com",
                        passwordHash: "$2a$10$dummyhash2",
                        role: "EDITOR",
                    },
                });
                console.log("User created:", user);
            }
            catch (createErr) {
                console.error("Error creating user:", createErr);
            }
        }
        catch (e) {
            console.error("Connection failed. Full error:");
            console.error(e);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main();
