import { useState } from "react"; // useState hook'unu al
import { useDispatch, useSelector } from "react-redux"; // useDispatch ve useSelector hook'larını al
import { setPost } from "state"; // Redux'daki gönderiyi güncellemek için setPost eylemini al
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material"; // MUI ikonlarını al
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"; // MUI bileşenlerini al
import FlexBetween from "components/FlexBetween"; // Özel FlexBetween bileşenini al
import Friend from "components/Friend"; // Arkadaşı görselleştirmek için Friend bileşenini al
import WidgetWrapper from "components/WidgetWrapper"; // Widget'ı sarmak için WidgetWrapper bileşenini al

// PostWidget bileşeni
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false); // Yorumların açık olup olmadığını takip etmek için bir state
  const dispatch = useDispatch(); // useDispatch hook'unu al
  const token = useSelector((state) => state.token); // Redux mağazasındaki token'ı al
  const loggedInUserId = useSelector((state) => state.user._id); // Redux mağazasındaki oturum açmış kullanıcının kimliğini al
  const isLiked = Boolean(likes[loggedInUserId]); // Oturum açmış kullanıcının bu gönderiyi beğenip beğenmediğini kontrol et
  const likeCount = Object.keys(likes).length; // Beğeni sayısını hesapla

  const { palette } = useTheme(); // MUI temalarını kullan
  const main = palette.neutral.main; // Ana rengi al
  const primary = palette.primary.main; // Birincil rengi al

  // Beğeni durumunu güncellemek için bir işlev
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json(); // Güncellenmiş gönderiyi al
    dispatch(setPost({ post: updatedPost })); // Redux mağazasındaki gönderiyi güncelle
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* Gönderiyi paylaşan kullanıcıyı görselleştir */}
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {/* Gönderinin açıklamasını göster */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {/* Gönderiye resim eklenmişse göster */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {/* Beğeni ve yorum sayısını göster */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* Beğeni butonu */}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            {/* Yorum butonu */}
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* Paylaşma butonu */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* Yorumlar bölümü */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

// PostWidget bileşenini dışa aktar
export default PostWidget;
