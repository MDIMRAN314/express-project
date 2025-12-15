import { JWT_COOKIE_EXPIRE_DAYS, NODE_ENV } from "../config/index.js";
import UserModel from "../models/User.js";

/* -------- @DESC POST ROUTES -------------
@REGISTER
@ACCESS PUBLIC 
@ROUTE /api/v1/auth/register
@ENDPOINT http://localhost:5000/api/v1/auth/register
It has request payload
@CONTENT-Type application/json
 */

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // const newUser = new UserModel({ username, email, password, role });
    // await newUser.save();

    const newUser = await UserModel.create({ username, email, password, role });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* -------- @DESC POST ROUTES -------------
@LOGIN
@ACCESS PUBLIC 
@ROUTE /api/v1/auth/register
@ENDPOINT http://localhost:5000/api/v1/auth/register
It has request payload
@CONTENT-Type application/json
 */

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Custom validation for email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // Check for user existence in database
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    sendTokenResponse(user, 200, res);
    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + JWT_COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (NODE_ENV === "production") {
    options.secure = true;
    // options.sameSite = "None";
  }
  res.status(statusCode).cookie("token", token, options);
};
