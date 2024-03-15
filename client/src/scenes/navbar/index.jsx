// React ve useState kancasını al
import { useState } from "react";
// MUI'den gerekli bileşenleri ve ikonları al
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
// Redux'dan useDispatch ve useSelector kancalarını al
import { useDispatch, useSelector } from "react-redux";
// Redux'tan eylemleri ve yönlendirmeyi al
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
// Özel bileşeni al
import FlexBetween from "components/FlexBetween";

// Navbar bileşeni
const Navbar = () => {
  // Mobil menünün açılıp kapanmasını takip etmek için yerel durum
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // Redux'tan dispatch fonksiyonunu al
  const dispatch = useDispatch();
  // Yönlendirme işlevini al
  const navigate = useNavigate();
  // Kullanıcı bilgilerini al
  const user = useSelector((state) => state.user);
  // Ekran boyutunu kontrol etmek için useMediaQuery kancasını kullan
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Tema özelliklerini al
  const theme = useTheme();
  // Tema renklerini ayarla
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Kullanıcının tam adını oluştur
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        {/* Site başlığı */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          // Ana sayfaya yönlendirme
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          AlisMedia
        </Typography>
        {/* Arama kutusu (yalnızca masaüstü için) */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* MASAÜSTÜ NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* Tema modunu değiştirme */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* Mesajlar */}
          <Message sx={{ fontSize: "25px" }} />
          {/* Bildirimler */}
          <Notifications sx={{ fontSize: "25px" }} />
          {/* Yardım */}
          <Help sx={{ fontSize: "25px" }} />
          {/* Kullanıcı adı ve çıkış */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* Kullanıcı adı */}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              {/* Çıkış */}
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        // MOBİL NAV (menu)
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBİL NAV (açılır menü) */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Menü kapatma ikonu */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menü öğeleri */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* Tema modu */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* Mesajlar */}
            <Message sx={{ fontSize: "25px" }} />
            {/* Bildirimler */}
            <Notifications sx={{ fontSize: "25px" }} />
            {/* Yardım */}
            <Help sx={{ fontSize: "25px" }} />
            {/* Kullanıcı adı ve çıkış */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                {/* Kullanıcı adı */}
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                {/* Çıkış */}
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

// Navbar bileşenini dışa aktar
export default Navbar;
