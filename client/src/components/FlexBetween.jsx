import { Box } from "@mui/material";
import styled from "@emotion/styled";

// FlexBetween adında stilize edilmiş bir kutu bileşeni oluşturuyoruz.
// Bu bileşen, içindeki öğeleri yatayda ve dikeyde ortalamak için "flex" özelliklerini kullanır.

// `styled` fonksiyonunu kullanarak, MUI Box bileşenini stilize ediyoruz.
const FlexBetween = styled(Box)({
  display: "flex", // Öğelerin yatayda sıralanması için "flex" özelliği
  justifyContent: "center", // Yatayda ortalamak için "center" özelliği
  alignItems: "center", // Dikeyde ortalamak için "center" özelliği
});

export default FlexBetween;
