import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser"; // Importe cookie-parser
import userRoutes from "./routes/userRoutes.js"; // Importe suas rotas
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" })); // Middleware para parsing de JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/api/users", userRoutes); // Defina a rota base para suas rotas de usuários
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
