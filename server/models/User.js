import mongoose from "mongoose"; // Mongoose kütüphanesini içeri aktar

// Kullanıcı şemasını tanımla
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      // Kullanıcının adı alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
      min: 2, // Minimum karakter sayısı: 2
      max: 50, // Maksimum karakter sayısı: 50
    },
    lastName: {
      // Kullanıcının soyadı alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
      min: 2, // Minimum karakter sayısı: 2
      max: 50, // Maksimum karakter sayısı: 50
    },
    email: {
      // Kullanıcının e-posta adresi alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
      max: 50, // Maksimum karakter sayısı: 50
      unique: true, // E-posta adresi benzersiz olmalı
    },
    password: {
      // Kullanıcının şifre alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
      min: 5, // Minimum karakter sayısı: 5
    },
    picturePath: {
      // Kullanıcının resim dosyası yolu alanı
      type: String, // Veri türü: String
      default: "", // Varsayılan değer: boş dize
    },
    friends: {
      // Kullanıcının arkadaşları alanı
      type: Array, // Veri türü: Array
      default: [], // Varsayılan değer: boş dizi
    },
    location: String, // Kullanıcının konum alanı (isteğe bağlı)
    occupation: String, // Kullanıcının meslek alanı (isteğe bağlı)
    viewedProfile: Number, // Profil görüntülenme sayısı alanı (isteğe bağlı)
    impressions: Number, // İzlenim sayısı alanı (isteğe bağlı)
  },
  { timestamps: true } // Zaman damgası özelliği etkin
);

// Kullanıcı modelini tanımla
const User = mongoose.model("User", UserSchema);

export default User; // Kullanıcı modelini dışa aktar
