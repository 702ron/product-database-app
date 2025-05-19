import { Router } from "express";
import multer from "multer";
import path from "path";
import { authenticate, authorize } from "../middleware/authMiddleware";
import * as imageController from "../controllers/imageController";

const router = Router();

// Configure Multer storage and file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// All image routes require authentication
router.use(authenticate);

// Upload image for a product
router.post(
  "/upload/:productId",
  authorize(["ADMIN", "EDITOR"]),
  upload.single("image"),
  imageController.uploadImage
);

// Get image metadata for a product
router.get("/product/:productId", imageController.getImagesForProduct);

// Serve image file
router.get("/file/:fileName", imageController.serveImageFile);

// Delete image
router.delete(
  "/:id",
  authorize(["ADMIN", "EDITOR"]),
  imageController.deleteImage
);

export default router;
