import express from "express"; // Express kütüphanesini içeri aktar
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js"; // Kullanıcıları al ve arkadaş ekle/çıkar işlemlerini içeren denetleyicileri içeri aktar
import { verifyToken } from "../middleware/auth.js"; // JWT token doğrulama ara katmanını içeri aktar

const router = express.Router(); // Yönlendirici oluştur

/* READ */
// "/users/:id" yoluna GET isteği geldiğinde, token doğrulamasını sağlayarak kullanıcıyı al
router.get("/:id", verifyToken, getUser);
// "/users/:id/friends" yoluna GET isteği geldiğinde, token doğrulamasını sağlayarak kullanıcının arkadaşlarını al
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// "/users/:id/:friendId" yoluna PATCH isteği geldiğinde, token doğrulamasını sağlayarak arkadaş ekle/çıkar
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router; // Yönlendiriciyi dışa aktar
