// MUI'den gerekli bileşenleri al
import { Box, useMediaQuery } from "@mui/material";
// Redux'tan useSelector fonksiyonunu al
import { useSelector } from "react-redux";
// Navbar bileşenini al
import Navbar from "scenes/navbar";
// UserWidget bileşenini al
import UserWidget from "scenes/widgets/UserWidget";
// MyPostWidget bileşenini al
import MyPostWidget from "scenes/widgets/MyPostWidget";
// PostsWidget bileşenini al
import PostsWidget from "scenes/widgets/PostsWidget";
// AdvertWidget bileşenini al
import AdvertWidget from "scenes/widgets/AdvertWidget";
// FriendListWidget bileşenini al
import FriendListWidget from "scenes/widgets/FriendListWidget";

// Ana sayfa bileşeni
const HomePage = () => {
  // Ekran boyutunu kontrol etmek için useMediaQuery kancasını kullan
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // Redux store'dan gerekli kullanıcı bilgilerini al
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      {/* Navbar bileşenini ekle */}
      <Navbar />
      {/* Ana içerik konteyneri */}
      <Box
        width="100%"
        padding="2rem 6%"
        // Ekran boyutuna göre düzeni ayarla
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* Kullanıcı bileşenini ekleyin */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/* Gönderi bileşenlerini ekleyin */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Kullanıcının kendi gönderilerini görüntüleyen bileşen */}
          <MyPostWidget picturePath={picturePath} />
          {/* Kullanıcının takip ettiği kişilerin gönderilerini görüntüleyen bileşen */}
          <PostsWidget userId={_id} />
        </Box>
        {/* Masaüstü ekranlarda görüntülenecek bileşenler */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* Reklam bileşenini ekleyin */}
            <AdvertWidget />
            {/* Boş bir kutu ekleyin */}
            <Box m="2rem 0" />
            {/* Arkadaş listesi bileşenini ekleyin */}
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Ana sayfa bileşenini dışa aktar
export default HomePage;
