import mongoose from "mongoose";

// Mongoose şeması tanımlanıyor
const postSchema = mongoose.Schema(
  {
    // Kullanıcı ID'si
    userId: {
      type: String,
      required: true,
    },
    // Kullanıcının adı
    firstName: {
      type: String,
      required: true,
    },
    // Kullanıcının soyadı
    lastName: {
      type: String,
      required: true,
    },
    // Gönderinin konumu
    location: {
      type: String,
      required: true,
    },
    // Gönderinin açıklaması
    description: String,
    // Gönderinin resim yolu
    picturePath: String,
    // Kullanıcının resim yolu
    userPicturePath: String,
    // Beğeniler (her kullanıcının ID'sini anahtar olarak içeren bir harita)
    likes: {
      type: Map,
      of: Boolean,
    },
    // Yorumlar (bir dizi olarak depolanır)
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // Zaman damgası ekleniyor
);

// Mongoose modeli oluşturuluyor
const Post = mongoose.model("Post", postSchema);

// Post modeli dışa aktarılıyor
export default Post;
