import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
// import userRouter from "./routes/userRouter";

// Express uygulaması oluşturuluyor
const app = express();

// JSON middleware
app.use(express.json());

// Kullanıcı route'larını ekle
// app.use("/users", userRouter);

// Veritabanı bağlantısını kur ve sunucuyu başlat
AppDataSource.initialize()
  .then(() => {
    console.log("Veritabanına başarıyla bağlanıldı!");

    app.listen(3000, () => {
      console.log("Sunucu 3000 portunda çalışıyor!");
    });
  })
  .catch((error) => console.log("Veritabanı bağlantı hatası:", error));
