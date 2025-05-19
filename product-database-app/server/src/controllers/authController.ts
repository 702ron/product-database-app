import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    console.log("Register attempt for:", email);

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "Email already in use." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const allowedRoles = ["ADMIN", "EDITOR", "VIEWER"];

    console.log("Creating user with details:", {
      username,
      email,
      role: allowedRoles.includes(role) ? role : "EDITOR",
    });

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        role: allowedRoles.includes(role) ? role : "EDITOR",
      },
    });

    console.log("User created successfully:", user.id);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Registration error details:", err);
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    if (!email || !password) {
      res.status(400).json({ message: "Email and password required." });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Login successful for:", email);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error details:", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};
