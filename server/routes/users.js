import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* OKUMA */
// Kullanıcıyı almak için endpoint
router.get("/:id", verifyToken, getUser);

// Kullanıcının arkadaşlarını almak için endpoint
router.get("/:id/friends", verifyToken, getUserFriends);

/* GÜNCELLEME */
// Kullanıcının arkadaşlarını eklemek veya çıkarmak için endpoint
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
