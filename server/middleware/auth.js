import jwt from "jsonwebtoken";

// Middleware fonksiyonu: Gelen isteğin token'ını doğrular
export const verifyToken = async (req, res, next) => {
  try {
    // İsteğin başlıklarından "Authorization" başlığını alır
    let token = req.header("Authorization");

    // Eğer token yoksa, erişim reddedilmiş olarak 403 hatası döndürülür
    if (!token) {
      return res.status(403).send("Access Denied: Token Missing");
    }

    // Eğer token "Bearer" ile başlıyorsa, "Bearer" kısmını kaldırır
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Token'ı doğrular ve içerisindeki bilgileri çözer
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // İstek nesnesine doğrulanan kullanıcı bilgilerini ekler
    req.user = verified;

    // Bir sonraki middleware veya işlem için kontrolü geçirir
    next();
  } catch (err) {
    // Hata durumunda, 500 (Internal Server Error) hatası döndürülür
    res
      .status(500)
      .json({ error: "Token Verification Failed", details: err.message });
  }
};
