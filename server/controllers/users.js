import User from "../models/User.js";

/* READ */
// Kullanıcının belirli bir kimliğe sahip olduğu bir endpoint.
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // İstekten gelen parametrelerden kullanıcı kimliğini alınır.
    const user = await User.findById(id); // Kullanıcı kimliği ile veritabanından kullanıcıyı bulma.
    res.status(200).json(user); // Kullanıcı başarıyla bulunursa istemciye kullanıcı bilgilerini gönderme.
  } catch (err) {
    res.status(404).json({ message: err.message }); // Hata durumunda istemciye bir hata mesajı gönderme.
  }
};

// Kullanıcının arkadaşlarını getirmek için bir API endpoint'i sağlayan fonksiyon.
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params; // İstekten gelen parametrelerden kullanıcı kimliğini alınır.

    const user = await User.findById(id); // Kullanıcı kimliği ile veritabanından kullanıcıyı bulma.

    // Kullanıcının arkadaşlarını paralel olarak getirme
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    // Arkadaşları istenilen formatta düzenleme
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Başarılı bir şekilde düzenlenmiş arkadaşları istemciye gönderme
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Hata durumunda istemciye bir hata mesajı gönderme
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

// Kullanıcının arkadaşını ekleyip çıkaran bir API endpoint'i sağlayan fonksiyon.
export const addRemoveFriend = async (req, res) => {
  try {
    // İstekten gelen parametreleri çıkartma
    const { id, friendId } = req.params;

    // Kullanıcıyı ve arkadaşı veritabanından bulma
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Kullanıcının arkadaşı zaten var mı kontrol etme
    if (user.friends.includes(friend.id)) {
      // Eğer varsa, arkadaşı listeden çıkar
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // Eğer yoksa, arkadaşı listeye ekle
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Değişiklikleri veritabanına kaydetme
    await user.save();
    await friend.save();

    // Kullanıcının güncellenmiş arkadaşlarını tekrar çekme
    const updatedFriends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    // Arkadaşları istenilen formatta düzenleme
    const formattedFriends = updatedFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Başarılı bir şekilde işlem tamamlandı mesajını ve güncellenmiş arkadaşları gönderme
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Hata durumunda istemciye bir hata mesajı gönderme
    res.status(404).json({ message: err.message });
  }
};
