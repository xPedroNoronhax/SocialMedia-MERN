import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5m", // Token expires in 5 minutes
  });

  res.cookie("jwt", token, {
    httpOnly: true, // more secure
    maxAge: 5 * 60 * 1000, // 5 minutes
    sameSite: "strict", // CSRF
  });

  return token;
};

export default generateTokenAndSetCookie;
