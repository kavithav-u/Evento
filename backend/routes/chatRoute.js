import express from "express";
const router = express.Router();
import {
  accessChat,
  fetchChats,
  searchUsers,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/search", protect, searchUsers);
router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);

export default router;