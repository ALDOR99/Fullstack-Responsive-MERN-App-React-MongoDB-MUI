import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ/OKUMA */
// Ana sayfadaki gönderileri almak için endpoint
router.get("/", verifyToken, getFeedPosts);

// Belirli bir kullanıcının gönderilerini almak için endpoint
router.get("/:userID/posts", verifyToken, getUserPosts);

/* UPDATE/GÜNCELLEME */
router.patch("/:id/like", verifyToken, likePost);

export default router;
