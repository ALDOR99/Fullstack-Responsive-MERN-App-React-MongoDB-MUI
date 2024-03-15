// MUI'den Box bileşenini al
import { Box } from "@mui/material";

// Kullanıcı resmini görüntülemek için bileşen oluştur
const UserImage = ({ image, size = "60px" }) => {
  return (
    // Resim konteyneri oluştur
    <Box width={size} height={size}>
      {/* Resmi görüntüle */}
      <img
        // Resmin boyutunu ve stilini ayarla
        style={{ objectFit: "cover", borderRadius: "50%" }}
        // Resmin genişliğini ve yüksekliğini ayarla
        width={size}
        height={size}
        // Alternatif metin ve kaynak belirt
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

// Bileşeni dışa aktar
export default UserImage;
