// Gerekli bileşenleri ve kancaları al
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

// AdvertWidget bileşeni
const AdvertWidget = () => {
  // Tema nesnesini al
  const { palette } = useTheme();
  // Tema renklerini ayarla
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    // WidgetWrapper bileşeni içine reklam bileşenini yerleştir
    <WidgetWrapper>
      {/* Başlık ve "Create Ad" düğmesi */}
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      {/* Reklam resmi */}
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      {/* Reklam veren ve web sitesi */}
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      {/* Reklam açıklaması */}
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

// AdvertWidget bileşenini dışa aktar
export default AdvertWidget;
