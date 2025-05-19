import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const createProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      productName,
      lotNumber,
      truckNumber,
      source,
      upc,
      asin,
      link,
      condition,
      damaged,
      missingItems,
      whatsMissing,
      notes,
      mixedId,
    } = req.body;

    // Get user ID from auth middleware
    const userId = req.user?.userId;

    const product = await prisma.product.create({
      data: {
        productName,
        lotNumber,
        truckNumber,
        source,
        upc,
        asin,
        link,
        condition,
        damaged,
        missingItems,
        whatsMissing,
        notes,
        mixedId,
        userId,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: "Failed to create product", error: err });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Failed to fetch product", error: err });
  }
};

export const updateProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      productName,
      lotNumber,
      truckNumber,
      source,
      upc,
      asin,
      link,
      condition,
      damaged,
      missingItems,
      whatsMissing,
      notes,
      mixedId,
    } = req.body;

    // First check if product exists
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        productName,
        lotNumber,
        truckNumber,
        source,
        upc,
        asin,
        link,
        condition,
        damaged,
        missingItems,
        whatsMissing,
        notes,
        mixedId,
      },
      include: {
        images: true,
      },
    });

    res.json(updatedProduct);
  } catch (err) {
    console.error("Product update error:", err);
    res.status(500).json({ message: "Failed to update product", error: err });
  }
};

export const deleteProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // First check if product exists
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Delete related images first to avoid foreign key constraints
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    // Delete the product
    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Product deletion error:", err);
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
};
