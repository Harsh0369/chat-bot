import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, process.env.Jwt_sec);
      if(!decoded) {
          return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = await User.findById(decoded._id);

      next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
