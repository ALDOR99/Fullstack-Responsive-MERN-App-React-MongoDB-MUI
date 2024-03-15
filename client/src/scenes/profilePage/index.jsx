// Gerekli bileşenleri ve kancaları al
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

// ProfilePage bileşeni
const ProfilePage = () => {
  // Kullanıcıyı saklamak için yerel durum
  const [user, setUser] = useState(null);
  // URL'den kullanıcı kimliğini al
  const { userId } = useParams();
  // Redux'tan tokeni al
  const token = useSelector((state) => state.token);
  // Ekran boyutunu kontrol etmek için useMediaQuery kancasını kullan
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Kullanıcı bilgilerini getiren yardımcı fonksiyon
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Sayfa yüklendiğinde kullanıcı bilgilerini al
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Kullanıcı bilgileri yüklenmediyse, null döndür ve beklet
  if (!user) return null;

  return (
    <Box>
      {/* Navigasyon çubuğu */}
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        // Ekran boyutuna göre görüntüleme şeklini ayarla
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* Kullanıcı bileşeni */}
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* Arkadaş listesi bileşeni */}
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Kullanıcının kendi gönderilerini gösteren bileşen */}
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* Kullanıcının profili için gönderileri gösteren bileşen */}
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

// ProfilePage bileşenini dışa aktar
export default ProfilePage;
