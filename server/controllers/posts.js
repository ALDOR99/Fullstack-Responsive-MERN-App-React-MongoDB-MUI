import Post from "../models/Post.js";

//--------------------------------------------------------------

/* READ-OKUMA*/

export const createPost = async (req, res) => {
  try {
    // İstekten gelen bilgiler çıkartılıyor
    const { userId, description, picturePath } = req.body;

    // Kullanıcı bilgileri veritabanından alınıyor (Örnek: User modeli kullanılarak)
    const user = await User.findById(userId);

    // Yeni bir Post nesnesi oluşturuluyor
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // Yeni gönderi veritabanına kaydediliyor
    await newPost.save();

    // Tüm gönderileri al ve isteğe yanıt olarak gönder
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    // Hata durumunda isteğe uygun bir hata mesajı gönder
    res.status(409).json({ message: err.message });
  }
};
//--------------------------------------------------------------

/* OKUMA */

// Tüm gönderileri al ve isteğe yanıt olarak gönder
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    // Hata durumunda uygun bir hata mesajı gönder
    res.status(404).json({ message: err.message });
  }
};

// Belirli bir kullanıcının gönderilerini al ve isteğe yanıt olarak gönder
export const getUserPosts = async (req, res) => {
  try {
    // İstek parametrelerinden kullanıcı ID'sini al
    const { userId } = req.params;

    // Kullanıcının gönderilerini veritabanından al
    const posts = await Post.find({ userId });

    // Alınan gönderileri isteğe yanıt olarak gönder
    res.status(200).json(posts);
  } catch (err) {
    // Hata durumunda uygun bir hata mesajı gönder
    res.status(404).json({ message: err.message });
  }
};

/* GÜNCELLEME */
export const likePost = async (req, res) => {
  try {
    // İstek parametrelerinden gönderi ID'sini ve gönderiyi beğenen kullanıcının ID'sini al
    const { id } = req.params;
    const { userId } = req.body;

    // Gönderiyi veritabanından bul
    const post = await Post.findById(id);

    // Gönderinin beğeni durumunu kontrol et
    const isLiked = post.likes.get(userId);

    // Beğeni durumuna göre işlem yap
    if (isLiked) {
      post.likes.delete(userId); // Beğeni varsa, beğeniyi geri al
    } else {
      post.likes.set(userId, true); // Beğeni yoksa, beğeni ekle
    }

    // Gönderiyi güncelle ve güncellenmiş gönderiyi al
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Güncellenmiş gönderiyi isteğe yanıt olarak gönder
    res.status(200).json(updatedPost);
  } catch (err) {
    // Hata durumunda uygun bir hata mesajı gönder
    res.status(404).json({ message: err.message });
  }
};
