import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();
const uploadDir = path.join(__dirname, "../uploads");

export const uploadImage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { type, isVisible } = req.body;
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    // Enforce conditional logic for damage images
    if (type === "DAMAGE_1" || type === "DAMAGE_2") {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product || !product.damaged) {
        res.status(400).json({
          message:
            "Cannot upload damage image unless product is marked as damaged.",
        });
        return;
      }
    }
    const image = await prisma.productImage.create({
      data: {
        productId,
        type,
        path: req.file.path,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        isVisible: isVisible !== undefined ? isVisible === "true" : true,
      },
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload image", error: err });
  }
};

export const getImagesForProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const images = await prisma.productImage.findMany({ where: { productId } });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch images", error: err });
  }
};

export const serveImageFile = (req: Request, res: Response): void => {
  const { fileName } = req.params;
  const filePath = path.join(uploadDir, fileName);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "Image not found" });
    return;
  }
  res.sendFile(filePath);
};

export const deleteImage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await prisma.productImage.findUnique({ where: { id } });
    if (!image) {
      res.status(404).json({ message: "Image not found" });
      return;
    }
    // Delete file from disk
    if (fs.existsSync(image.path)) {
      fs.unlinkSync(image.path);
    }
    await prisma.productImage.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image", error: err });
  }
};
