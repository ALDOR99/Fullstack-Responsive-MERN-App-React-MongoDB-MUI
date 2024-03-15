import mongoose from "mongoose"; // Mongoose kütüphanesini içeri aktar

// Post veri şeması tanımlama
const postSchema = mongoose.Schema(
  {
    userId: {
      // Kullanıcı kimliği alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
    },
    firstName: {
      // Kullanıcının adı alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
    },
    lastName: {
      // Kullanıcının soyadı alanı
      type: String, // Veri türü: String
      required: true, // Zorunlu alan
    },
    location: String, // Konum alanı (isteğe bağlı)
    description: String, // Açıklama alanı (isteğe bağlı)
    picturePath: String, // Resim dosyası yolu alanı (isteğe bağlı)
    userPicturePath: String, // Kullanıcı resim dosyası yolu alanı (isteğe bağlı)
    likes: {
      // Beğeniler alanı
      type: Map, // Veri türü: Map
      of: Boolean, // Değerlerin veri türü: Boolean
    },
    comments: {
      // Yorumlar alanı
      type: Array, // Veri türü: Array
      default: [], // Varsayılan değer: boş dizi
    },
  },
  { timestamps: true } // Zaman damgası özelliği etkin
);

// Post modelini tanımlama
const Post = mongoose.model("Post", postSchema);

export default Post; // Post modelini dışa aktarma
