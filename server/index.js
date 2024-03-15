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

/* CONFIGURATIONS */
// Dosya ve klasör yollarını belirlemek için kullanılır
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// .env dosyasını yükler
dotenv.config();
// Express uygulaması oluşturulur
const app = express();
// JSON verilerini işlemek için kullanılır
app.use(express.json());
// Güvenlik önlemlerini sağlar
app.use(helmet());
// Cross-origin kaynak politikasını ayarlar
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// HTTP isteklerini günlüğe kaydeder
app.use(morgan("common"));
// Body-parser modülünü kullanarak istek gövdesini işler
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// CORS politikasını ayarlar
app.use(cors());
// Statik dosyaların servis edileceği yolu belirtir
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// Dosya yükleme konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
// Resim yüklemesiyle kullanıcı kaydı endpoint'i
app.post("/auth/register", upload.single("picture"), register);
// Resim yüklemesiyle gönderi oluşturma endpoint'i
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
// Auth yönlendiricisi
app.use("/auth", authRoutes);
// Kullanıcı yönlendiricisi
app.use("/users", userRoutes);
// Gönderi yönlendiricisi
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
// Port numarası belirlenir
const PORT = process.env.PORT || 6001;
// MongoDB'ye bağlanma işlemi
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Sunucu dinleme işlemi
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // Veritabanına örnek verileri ekler
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
