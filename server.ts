import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
// import userRoutes from "./routes/userRoutes";
// import userDrinkRoutes from "./routes/userDrinkRoutes";

const app = express();
const port = 3000;

app.use(express.json()); // JSON parse middleware for POST requests

// MongoDB bağlantısı
createConnection().then(() => {
    console.log("MongoDB bağlantısı başarılı!");

    // Route'ları kullanma
    // app.use("/api/users", userRoutes);
    // app.use("/api/user-drinks", userDrinkRoutes);

    app.listen(port, () => {
        console.log(`Sunucu http://localhost:${port} adresinde çalışıyor!`);
    });
}).catch(error => console.log(error));
