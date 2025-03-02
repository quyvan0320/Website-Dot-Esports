import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  allCategoies,
  categoryBySlug,
  createCategory,
  deleteCategory,
  getCategoryAndTopic,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategoryAndTopic);
router.post("/", authenticate, authorizeRoles("admin"), createCategory);
router.get("/:slug", categoryBySlug);
router.get("/", allCategoies);
router.put("/:id", authenticate, authorizeRoles("admin"), updateCategory);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteCategory);

export default router;
