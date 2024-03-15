import { useEffect } from "react"; // useEffect kancasını al
import { useDispatch, useSelector } from "react-redux"; // useDispatch ve useSelector kancalarını al
import { setPosts } from "state"; // Redux'daki gönderileri güncellemek için setPosts eylemini al
import PostWidget from "./PostWidget"; // PostWidget bileşenini al

// PostsWidget bileşeni
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch(); // useDispatch hook'unu al
  const posts = useSelector((state) => state.posts); // Redux mağazasındaki gönderileri al
  const token = useSelector((state) => state.token); // Redux mağazasındaki token'ı al

  // Tüm gönderileri sunucudan al ve Redux mağazasına eklemek için bir fonksiyon
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // Belirli bir kullanıcının gönderilerini sunucudan al ve Redux mağazasına eklemek için bir fonksiyon
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    // Profil sayfasındaysak, kullanıcının gönderilerini al
    if (isProfile) {
      getUserPosts();
    } else {
      // Profil sayfasında değilsek, tüm gönderileri al
      getPosts();
    }
  }, []); // useEffect'in yalnızca bir kez çalışmasını sağla

  return (
    <>
      {/* Gönderileri görselleştirmek için PostWidget bileşenini kullan */}
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

// PostsWidget bileşenini dışa aktar
export default PostsWidget;
