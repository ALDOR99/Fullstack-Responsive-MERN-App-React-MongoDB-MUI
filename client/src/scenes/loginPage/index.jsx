// MUI'den gerekli bileşenleri al
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
// Form bileşenini al
import Form from "./Form";

// LoginPage bileşeni
const LoginPage = () => {
  // Tema özelliklerini al
  const theme = useTheme();
  // Ekran boyutunu kontrol etmek için useMediaQuery kancasını kullan
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    // Ana kutu bileşeni
    <Box>
      {/* Başlık kutusu */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        {/* Başlık */}
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      {/* Giriş formu kutusu */}
      <Box
        // Ekran boyutuna göre genişlik belirle
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* Açıklama */}
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        {/* Giriş formu */}
        <Form />
      </Box>
    </Box>
  );
};

// LoginPage bileşenini dışa aktar
export default LoginPage;
