import jwt from "jsonwebtoken"; // JSON Web Token kütüphanesini içeri aktar

// Kullanıcı token'ını doğrulamak için bir ara yazılım fonksiyonu
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); // İstek başlığından token'ı al

    if (!token) {
      return res.status(403).send("Access Denied"); // Eğer token yoksa erişim reddedildi hatası döndür
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); // Eğer token "Bearer " ile başlıyorsa bu kısmı kaldır
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrula
    req.user = verified; // Doğrulanmış kullanıcı bilgisini istek nesnesine ekle
    next(); // Sonraki ara yazılıma geç
  } catch (err) {
    res.status(500).json({ error: err.message }); // Herhangi bir hata durumunda 500 hatası döndür
  }
};
