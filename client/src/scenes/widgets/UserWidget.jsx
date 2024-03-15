import { useState, useEffect } from "react"; // useState ve useEffect hook'larını al
import { useSelector } from "react-redux"; // useSelector hook'unu al
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu al
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material"; // MUI ikonlarını al
import { Box, Typography, Divider, useTheme } from "@mui/material"; // MUI bileşenlerini al
import UserImage from "components/UserImage"; // Kullanıcı resmini görselleştirmek için UserImage bileşenini al
import FlexBetween from "components/FlexBetween"; // Özel FlexBetween bileşenini al
import WidgetWrapper from "components/WidgetWrapper"; // Widget'ı sarmak için WidgetWrapper bileşenini al

// UserWidget bileşeni
const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null); // Kullanıcı bilgilerini içeren state
  const { palette } = useTheme(); // MUI temalarını kullan
  const navigate = useNavigate(); // Navigasyon işlevini al
  const token = useSelector((state) => state.token); // Redux mağazasındaki token'ı al
  const dark = palette.neutral.dark; // Koyu renk
  const medium = palette.neutral.medium; // Orta tonlu renk
  const main = palette.neutral.main; // Ana renk

  // Kullanıcı bilgilerini getiren işlev
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json(); // Yanıt verisini al
    setUser(data); // Kullanıcı verisini ayarla
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* İlk satır: Kullanıcı adı ve arkadaş sayısı */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          {/* Kullanıcı resmi */}
          <UserImage image={picturePath} />
          <Box>
            {/* Kullanıcı adı */}
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            {/* Arkadaş sayısı */}
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {/* Kullanıcı hesabını yönetmek için simge */}
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* İkinci satır: Konum ve meslek */}
      <Box p="1rem 0">
        {/* Konum */}
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        {/* Meslek */}
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Üçüncü satır: Profil görüntülemeleri ve post izlenimleri */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          {/* Profil görüntülemeleri */}
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          {/* Post izlenimleri */}
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Dördüncü satır: Sosyal profiller */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* Twitter profili */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {/* Profil düzenleme simgesi */}
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        {/* Linkedin profili */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {/* Profil düzenleme simgesi */}
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

// UserWidget bileşenini dışa aktar
export default UserWidget;
