import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";

import {
  createPost,
  deletePost,
  getFeaturedPosts,
  getLatestPost,
  getOnePost,
  getPostCategory,
  getPosts,

  getPostsPaginationByUserId,
  getPostsPanigation,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/latest-post", getLatestPost);
router.get("/category/:categorySlug", getPostCategory);

router.get("/panigation-post-user", getPostsPaginationByUserId);
router.get("/featured-post", getFeaturedPosts);
router.get("/panigation-post", getPostsPanigation);
router.post("/", authenticate, authorizeRoles("author", "admin"), createPost);
router.get("/", getPosts);
router.get("/:slug", getOnePost);
router.put("/:id", authenticate, authorizeRoles("author", "admin"), updatePost);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("author", "admin"),
  deletePost
);
router.get;
export default router;
