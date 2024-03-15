import Post from "../models/Post.js"; // Post modelini içeri aktar
import User from "../models/User.js"; // User modelini içeri aktar

/* YENİ POST OLUŞTURMA */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; // İstekten gelen verileri al
    const user = await User.findById(userId); // Kullanıcıyı veritabanından al

    // Yeni post nesnesi oluştur
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // Başlangıçta boş bir beğeni nesnesi oluştur
      comments: [], // Başlangıçta boş bir yorum dizisi oluştur
    });

    await newPost.save(); // Yeni postu kaydet

    const post = await Post.find(); // Tüm postları al
    res.status(201).json(post); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(409).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};

/* POSTLARI GETİRME */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); // Tüm postları al
    res.status(200).json(post); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // İstekten kullanıcı kimliğini al
    const post = await Post.find({ userId }); // Belirli bir kullanıcıya ait postları al
    res.status(200).json(post); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};

/* POSTU GÜNCELLEME */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // İstekten post kimliğini al
    const { userId } = req.body; // İstekten kullanıcı kimliğini al
    const post = await Post.findById(id); // Belirli bir postu bul

    // Kullanıcının bu postu beğenip beğenmediğini kontrol et
    const isLiked = post.likes.get(userId);

    // Eğer beğenilmişse, beğeniyi kaldır; aksi halde, beğeni ekle
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Postu güncelle ve güncellenmiş postu al
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};
