import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js"; // Importe suas rotas

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Middleware para parsing de JSON

app.use("/api/users", userRoutes); // Defina a rota base para suas rotas de usuários

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
