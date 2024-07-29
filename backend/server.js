import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser"; // Importe cookie-parser
import userRoutes from "./routes/userRoutes.js"; // Importe suas rotas
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Middleware para parsing de JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/api/users", userRoutes); // Defina a rota base para suas rotas de usuários
app.use("/api/post", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
