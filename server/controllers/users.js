import User from "../models/User.js"; // User modelini içeri aktar

/* KULLANICI BİLGİSİNİ GETİR */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // İstekten kullanıcı kimliğini al
    const user = await User.findById(id); // Belirli bir kullanıcıyı bul
    res.status(200).json(user); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};

/* KULLANICININ ARKADAŞLARINI GETİR */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params; // İstekten kullanıcı kimliğini al
    const user = await User.findById(id); // Belirli bir kullanıcıyı bul

    // Kullanıcının arkadaşlarını al ve bekleyen tüm isteklerin sonuçlanmasını bekleyin
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Arkadaşların formatını düzenle
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};

/* ARKADAŞ EKLEME/ÇIKARMA */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params; // İstekten kullanıcı ve arkadaş kimliğini al
    const user = await User.findById(id); // Kullanıcıyı bul
    const friend = await User.findById(friendId); // Arkadaşı bul

    // Eğer arkadaş zaten varsa, arkadaşı listeden çıkar; aksi halde, arkadaşı ekler
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Değişiklikleri kaydet
    await user.save();
    await friend.save();

    // Kullanıcının arkadaşlarını al ve bekleyen tüm isteklerin sonuçlanmasını bekleyin
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Arkadaşların formatını düzenle
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends); // Başarılı yanıtı gönder
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda uygun yanıtı gönder
  }
};
