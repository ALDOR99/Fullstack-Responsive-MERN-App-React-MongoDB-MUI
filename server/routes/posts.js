import express from "express"; // Express kütüphanesini içeri aktar
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"; // Postları al ve beğenme işlemini içeren denetleyicileri içeri aktar
import { verifyToken } from "../middleware/auth.js"; // JWT token doğrulama ara katmanını içeri aktar

const router = express.Router(); // Yönlendirici oluştur

/* READ */
// "/posts" yoluna GET isteği geldiğinde, token doğrulamasını sağlayarak beslemeyi al
router.get("/", verifyToken, getFeedPosts);
// "/posts/:userId/posts" yoluna GET isteği geldiğinde, token doğrulamasını sağlayarak kullanıcının postalarını al
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
// "/posts/:id/like" yoluna PATCH isteği geldiğinde, token doğrulamasını sağlayarak bir gönderiyi beğen
router.patch("/:id/like", verifyToken, likePost);

export default router; // Yönlendiriciyi dışa aktar
