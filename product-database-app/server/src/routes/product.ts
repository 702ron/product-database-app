import { Router } from "express";
import * as productController from "../controllers/productController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

// All product routes require authentication
router.use(authenticate);

// Create product (EDITOR or ADMIN)
router.post(
  "/",
  authorize(["ADMIN", "EDITOR"]),
  productController.createProduct
);
// Get all products (any authenticated user)
router.get("/", productController.getProducts);
// Get single product
router.get("/:id", productController.getProductById);
// Update product (EDITOR or ADMIN)
router.put(
  "/:id",
  authorize(["ADMIN", "EDITOR"]),
  productController.updateProduct
);
// Delete product (ADMIN only)
router.delete("/:id", authorize(["ADMIN"]), productController.deleteProduct);

export default router;
