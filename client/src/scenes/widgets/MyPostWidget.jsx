import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material"; // Gerekli simgeleri al
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material"; // Gerekli bileşenleri ve kancaları al
import FlexBetween from "components/FlexBetween"; // Özel bileşen FlexBetween'ı al
import Dropzone from "react-dropzone"; // Resim yükleme alanı için Dropzone'ı al
import UserImage from "components/UserImage"; // Kullanıcı resmi bileşenini al
import WidgetWrapper from "components/WidgetWrapper"; // WidgetWrapper bileşenini al
import { useState } from "react"; // useState kancasını al
import { useDispatch, useSelector } from "react-redux"; // useDispatch ve useSelector kancalarını al
import { setPosts } from "state"; // Redux'daki gönderileri güncellemek için setPosts eylemini al

// MyPostWidget bileşeni
const MyPostWidget = ({ picturePath }) => {
  // useDispatch hook'unu al
  const dispatch = useDispatch();
  // State hook'ları
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  // Tema nesnesini al
  const { palette } = useTheme();
  // Redux store'dan token ve kullanıcı kimliğini al
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // Ekran genişliğini kontrol etmek için useMediaQuery hook'unu kullan
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // Tema renklerini al
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Gönderiyi göndermek için bir fonksiyon
  const handlePost = async () => {
    // Form verilerini tutmak için FormData nesnesi oluştur
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    // Eğer resim varsa, FormData'ya resmi ekle
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    // Gönderiyi sunucuya POST isteği yaparak gönder
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    // Redux store'daki gönderileri güncelle
    dispatch(setPosts({ posts }));
    // State'i sıfırla
    setImage(null);
    setPost("");
  };

  return (
    // WidgetWrapper bileşeni içine MyPostWidget bileşenini yerleştir
    <WidgetWrapper>
      {/* Kullanıcı resmi ve gönderi giriş alanı */}
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {/* Eğer resim seçilmişse, resim yükleme alanını göster */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* Resim yükleme alanı */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {/* Eğer resim yoksa, "Add Image Here" yazısı göster */}
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    // Eğer resim varsa, resmin adını ve düzenle simgesini göster
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {/* Eğer resim varsa, silme simgesini göster */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* Ayırıcı */}
      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Gönderi araçları */}
      <FlexBetween>
        {/* Gönderi araçları listesi */}
        {/* Eğer büyük ekranlarsa, tüm araçları göster */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          // Küçük ekranlarsa, sadece daha fazla seçenekler simgesini göster
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        {/* Gönderi gönderme düğmesi */}
        <Button
          disabled={!post} // Gönderi boşsa düğmeyi devre dışı bırak
          onClick={handlePost} // Gönderi gönderme işlevini çağır
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

// MyPostWidget bileşenini dışa aktar
export default MyPostWidget;
