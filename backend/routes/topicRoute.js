import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  allTopics,
  createTopic,
  deleteTopic,
  topicBySlug,
  updateTopic,
} from "../controllers/topicController.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createTopic);
router.get("/:slug", topicBySlug);
router.get("/", allTopics);
router.put("/:id", authenticate, authorizeRoles("admin"), updateTopic);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteTopic);

export default router;
