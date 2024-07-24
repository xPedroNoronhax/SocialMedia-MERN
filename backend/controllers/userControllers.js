import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Gerar senha criptografada
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar e salvar novo usuário
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    // Gerar token e definir cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Responder com sucesso
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error in signupUser", error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Encontrar usuário pelo nome de usuário
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Comparar senha
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Gerar token e definir cookie
    generateTokenAndSetCookie(user._id, res);

    // Responder com sucesso
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export { signupUser, loginUser };
