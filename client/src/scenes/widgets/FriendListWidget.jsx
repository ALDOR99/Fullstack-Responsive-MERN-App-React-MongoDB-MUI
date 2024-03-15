// Gerekli bileşenleri ve kancaları al
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

// FriendListWidget bileşeni
const FriendListWidget = ({ userId }) => {
  // useDispatch hook'unu al
  const dispatch = useDispatch();
  // Tema nesnesini al
  const { palette } = useTheme();
  // Redux store'dan token ve friends'ı al
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Kullanıcının arkadaşlarını almak için bir fonksiyon
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // Redux store'da friends'ı güncelle
    dispatch(setFriends({ friends: data }));
  };

  // Komponent yüklendiğinde arkadaşları al
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // WidgetWrapper bileşeni içine arkadaş listesi bileşenini yerleştir
    <WidgetWrapper>
      {/* Başlık */}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {/* Arkadaş listesi */}
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          // Her arkadaş için Friend bileşeni oluştur
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

// FriendListWidget bileşenini dışa aktar
export default FriendListWidget;
