import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
//----------------------------------------------------------------

// CONFIGURATION
// Dosya yollarını belirleme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment dosyasını kullanma
dotenv.config();

// Express uygulamasını oluşturma
const app = express();
// JSON ve güvenlik önlemleri için Express ortamını yapılandırma
app.use(express.json()); // Gelen JSON verilerini işlemek için
app.use(helmet()); // Güvenlik başlıklarını eklemek için
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Cross-origin resource sharing (CORS) politikasını ayarlamak için

// HTTP istekleri üzerinde günlük tutma (logging) konfigürasyonu
app.use(morgan("common")); // Ortak HTTP günlük formatını kullanmak için

// Body parser ve cors ayarları
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Gelen JSON verilerini işlemek için limit ve extended seçeneklerini ayarlamak için
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // URL-encoded verileri işlemek için limit ve extended seçeneklerini ayarlamak için
app.use(cors()); // Cross-origin resource sharing (CORS) özelliğini etkinleştirmek için

// Statik dosyaları sunma (örneğin, resimler, CSS dosyaları) konfigürasyonu
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // "/assets" yolu altındaki dosyaları statik olarak sunmak için

// Diğer konfigürasyonlar buraya eklenebilir...

// FILE STORAGE CONFIGURATION
// Dosya depolama konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Yüklenen dosyaların hedef dizini belirleme
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // Yüklenen dosyanın adını belirleme
    cb(null, file.originalname);
  },
});

// Multer kullanarak dosya yükleme işlemini yapılandırma
const upload = multer({ storage });

/*ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*ROUTES WITh FILES */
app.post("/auth/register", upload.single("picture"), verifyToken, register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* MONGOOSE SETUP */
// Mongoose kurulumu
const PORT = process.env.PORT || 6001;

// MongoDB'ye bağlantı yapma
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Bağlantı başarılı olduğunda sunucuyu dinlemeye başlama
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    User.insertMany(users);
    Post.insertMany(posts);
  })

  .catch((error) => {
    // Bağlantı hatası durumunda hata mesajını yazdırma
    console.log(`${error} did not connect`);
  });
