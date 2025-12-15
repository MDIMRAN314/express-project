import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import UserModel from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // req.user = decoded.id;
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(
      res.status(401).json({ message: "Not authorized, token failed" })
    );
  }
};

// Grant access to specific roles
export const role = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `User role ${req.user.role} is not authorized` });
    }
    next();
  };
};
