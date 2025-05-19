import { Request, Response, NextFunction } from "express";
import multer from "multer";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Max size is 5MB." });
    }
    return res.status(400).json({ message: err.message });
  } else if (
    err &&
    err.message &&
    err.message.includes("Only JPEG, PNG, and WEBP images are allowed")
  ) {
    return res.status(400).json({ message: err.message });
  }
  // General error fallback
  return res
    .status(500)
    .json({
      message: "An unexpected error occurred.",
      error: err?.message || err,
    });
}
