// MUI'den gerekli bileşenleri al
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
// Redux için gerekli fonksiyonları al
import { useDispatch, useSelector } from "react-redux";
// React Router'dan sayfa yönlendirme özelliğini al
import { useNavigate } from "react-router-dom";
// Redux store'dan arkadaş listesini güncelleme eylemini al
import { setFriends } from "state";
// Özel bileşenleri al
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// Arkadaş bileşeni
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // Redux'tan dispatch fonksiyonunu al
  const dispatch = useDispatch();
  // Sayfa yönlendirme özelliğini kullan
  const navigate = useNavigate();
  // Redux store'dan gerekli verileri al
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Tema renklerini kullan
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Arkadaşın varlığını kontrol et
  const isFriend = friends.find((friend) => friend._id === friendId);

  // Arkadaşın durumunu güncelleme işlevi
  const patchFriend = async () => {
    // Arkadaşlık isteği gönderme veya kaldırma işlemini gerçekleştir
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Sunucudan gelen yanıtı json olarak al
    const data = await response.json();
    // Redux store'daki arkadaş listesini güncelle
    dispatch(setFriends({ friends: data }));
  };

  return (
    // Arkadaş bileşeni konteynırı
    <FlexBetween>
      {/* Arkadaşın profil resmi ve adı */}
      <FlexBetween gap="1rem">
        {/* Arkadaşın profil resmi */}
        <UserImage image={userPicturePath} size="55px" />
        {/* Arkadaşın adı ve alt başlığı */}
        <Box
          onClick={() => {
            // Arkadaşın profil sayfasına yönlendir
            navigate(`/profile/${friendId}`);
            // Sayfa yenilemesini engelle
            navigate(0);
          }}
        >
          {/* Arkadaşın adı */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {/* Arkadaşın alt başlığı */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* Arkadaş ekleme veya kaldırma düğmesi */}
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {/* Arkadaş ekleme veya kaldırma simgesi */}
        {isFriend ? (
          // Eğer arkadaş ise, kaldır simgesini göster
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          // Eğer arkadaş değilse, ekle simgesini göster
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
