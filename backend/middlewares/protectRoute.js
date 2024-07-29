import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("No user found with this ID");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in protectRoute", error.message);
  }
};

export default protectRoute;
