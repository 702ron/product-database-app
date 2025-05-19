// This file contains type declarations for the project

// Import types needed throughout the application
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// Define a user JWT payload interface
export interface UserJwtPayload extends JwtPayload {
  userId: string;
  username: string;
  role: string;
}

// Define a custom request interface with user property
export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}

// Other custom types used in the application
export interface ProductImage {
  id: string;
  productId: string;
  type: string;
  path: string;
  fileName: string;
  mimeType: string;
  size: number;
  isVisible: boolean;
  uploadedAt: Date;
}

export interface Product {
  id: string;
  productName: string;
  lotNumber: string;
  truckNumber: string;
  source: string;
  upc: string;
  asin?: string;
  link?: string;
  condition: "NEW" | "USED" | "PARTS_ONLY";
  damaged: boolean;
  missingItems: boolean;
  whatsMissing?: string;
  notes?: string;
  mixedId?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  images?: ProductImage[];
}

// Re-export AuthRequest from authMiddleware
import { AuthRequest } from "../middleware/authMiddleware";
export { AuthRequest };
