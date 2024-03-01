import { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATION
// Dosya yollarını belirleme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment dosyasını kullanma
dotenv.config();

// Express uygulamasını oluşturma
const app = Express();

// JSON ve güvenlik önlemleri için Express ortamını yapılandırma
app.use(Express.json()); // Gelen JSON verilerini işlemek için
app.use(helmet()); // Güvenlik başlıklarını eklemek için
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Cross-origin resource sharing (CORS) politikasını ayarlamak için

// HTTP istekleri üzerinde günlük tutma (logging) konfigürasyonu
app.use(morgan("common")); // Ortak HTTP günlük formatını kullanmak için

// Body parser ve cors ayarları
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Gelen JSON verilerini işlemek için limit ve extended seçeneklerini ayarlamak için
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // URL-encoded verileri işlemek için limit ve extended seçeneklerini ayarlamak için
app.use(cors()); // Cross-origin resource sharing (CORS) özelliğini etkinleştirmek için

// Statik dosyaları sunma (örneğin, resimler, CSS dosyaları) konfigürasyonu
app.use("/assets", Express.static(path.join(__dirname, "public/assets"))); // "/assets" yolu altındaki dosyaları statik olarak sunmak için

// Diğer konfigürasyonlar buraya eklenebilir...

//FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
