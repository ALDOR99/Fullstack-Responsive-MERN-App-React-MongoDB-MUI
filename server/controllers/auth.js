import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Kullanıcı Kaydı */
export const register = async (req, res) => {
  try {
    // Gelen istekten gerekli bilgileri alma
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Şifreleme için tuz oluşturma
    const salt = await bcrypt.genSalt(); // Şifreleme için tuz oluşturma
    const passwordHash = await bcrypt.hash(password, salt); // Şifreyi hashleme

    // Yeni kullanıcı oluşturma
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Hashlenmiş şifreyi kullanma
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Rastgele profil görüntülenme sayısı atama
      impressions: Math.floor(Math.random() * 10000), // Rastgele izlenim sayısı atama
    });

    // Yeni kullanıcıyı kaydetme
    const savedUser = await newUser.save(); // Kullanıcıyı veritabanına kaydetme
    res.status(201).json(savedUser); // Başarılı yanıt gönderme
  } catch (err) {
    res.status(500).json({ error: err.message }); // Hata durumunda yanıt gönderme
  }
};

/* Giriş Yapma */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı e-posta adresine göre bulma
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Kullanıcı mevcut değil. " }); // Kullanıcı yoksa hata gönderme

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Geçersiz kimlik bilgileri. " }); // Şifre eşleşmiyorsa hata gönderme

    // JWT ile token oluşturma
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Kullanıcı kimliğini kullanarak JWT ile token oluşturma
    delete user.password; // Kullanıcı parolasını silme
    res.status(200).json({ token, user }); // Başarılı yanıt gönderme
  } catch (err) {
    res.status(500).json({ error: err.message }); // Hata durumunda yanıt gönderme
  }
};
