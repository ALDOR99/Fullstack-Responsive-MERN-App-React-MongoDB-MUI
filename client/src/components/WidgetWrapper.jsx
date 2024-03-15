// MUI'den Box bileşenini al
import { Box } from "@mui/material";
// MUI'den styled API'sini al
import { styled } from "@mui/system";

// WidgetWrapper bileşenini oluştur ve stilini tanımla
const WidgetWrapper = styled(Box)(({ theme }) => ({
  // Bileşenin dolgusunu ayarla
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  // Bileşenin arka plan rengini tema renklerinden al
  backgroundColor: theme.palette.background.alt,
  // Bileşenin kenarlarını yuvarlat
  borderRadius: "0.75rem",
}));

// Bileşeni dışa aktar
export default WidgetWrapper;
