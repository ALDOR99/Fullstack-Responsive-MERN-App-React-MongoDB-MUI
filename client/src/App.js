import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // Redux'tan mod ve yetkilendirme durumunu al
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  // Tema oluşturucuyu memoize et
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      {/* Tarayıcı tabanlı yönlendirme için BrowserRouter */}
      <BrowserRouter>
        {/* Tema sağlayıcısı için ThemeProvider */}
        <ThemeProvider theme={theme}>
          {/* CSS reset için CssBaseline */}
          <CssBaseline />
          {/* Yönlendirme yapısını oluşturan Routes */}
          <Routes>
            {/* Ana sayfa */}
            <Route path="/" element={<LoginPage />} />
            {/* Ana sayfa ya da giriş yapılmadıysa giriş sayfasına yönlendir */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            {/* Kullanıcı profili sayfası */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
