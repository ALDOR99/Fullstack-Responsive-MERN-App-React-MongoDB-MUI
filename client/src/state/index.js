import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const initialState = {
  mode: "light", // Tema modu: "light" veya "dark"
  user: null, // Kullanıcı bilgileri
  token: null, // Kullanıcı oturum açma belirteci (token)
  posts: [], // Gönderilerin listesi
};

// Redux dilimi oluşturma
export const authSlice = createSlice({
  name: "auth", // Dilim adı
  initialState, // Başlangıç durumu
  reducers: {
    // Tema modunu değiştirme
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Kullanıcı oturum açtığında kullanılır, kullanıcı bilgilerini ve token'ı depolar
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Kullanıcı oturumu kapattığında kullanılır, kullanıcı bilgilerini ve token'ı temizler
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Kullanıcının arkadaş listesini günceller
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Gönderilerin listesini günceller
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Tek bir gönderiyi günceller
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Dışa aktarılan eylemler ve azaltıcı
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
