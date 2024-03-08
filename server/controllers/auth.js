import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* 
   Kullanıcı kaydı için controller fonksiyonu. 
   @param req - HTTP isteği
   @param res - HTTP yanıtı
*/
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

    // Şifreyi güvenli hale getirme
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Yeni kullanıcı nesnesini oluşturma
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Rasgele bir profil görüntüleme sayısı
      impressions: Math.floor(Math.random() * 10000), // Rasgele bir etkileşim sayısı
    });

    // Kullanıcıyı kaydetme
    const savedUser = await newUser.save();

    // Başarılı yanıt
    res.status(201).json(savedUser);
  } catch (err) {
    // Hata durumunda yanıt
    res.status(500).json({ error: err.message });
  }
};

/* 
   Kullanıcı girişi için controller fonksiyonu. 
   @param req - HTTP isteği
   @param res - HTTP yanıtı
*/
export const login = async (req, res) => {
  try {
    // Gelen istekten gerekli bilgileri alma
    const { email, password } = req.body;

    // Kullanıcıyı bulma
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // JWT token oluşturma
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Kullanıcı nesnesinden şifreyi silme
    delete user.password;

    // Başarılı yanıt
    res.status(200).json({ token, user });
  } catch (err) {
    // Hata durumunda yanıt
    res.status(500).json({ error: err.message });
  }
};
