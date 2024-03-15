import express from "express"; // Express kütüphanesini içeri aktar
import { login } from "../controllers/auth.js"; // Oturum açma denetleyicisini içeri aktar

const router = express.Router(); // Yönlendirici oluştur

// POST isteği için "/login" yoluna oturum açma denetleyicisini ekle
router.post("/login", login);

export default router; // Yönlendiriciyi dışa aktar
