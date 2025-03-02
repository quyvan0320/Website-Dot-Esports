import express from "express";
import {
  allUsers,
  deleteUserById,
  login,
  logout,
  register,
  updateProfile,
  updateUserRoles,
} from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// client
router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);

router.put(
  "/update-profile",
  authenticate,
  authorizeRoles("reader", "author", "admin"),
  updateProfile
);

// // admin
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteUserById);
router.get("/", authenticate, authorizeRoles("admin"), allUsers);

router.put(
  "/update-role/:id",
  authenticate,
  authorizeRoles("admin"),
  updateUserRoles
);

export default router;
