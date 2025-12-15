import { Router } from "express";
import { login, registerUser } from "../controllers/auth.js";
import { protect } from "../middlewares/authMiddleware.js";
import { profile } from "../controllers/profile.js";
const authRouter = Router();

authRouter.route("/auth/register").post(registerUser);
authRouter.route("/auth/login").post(login);
authRouter.route("/auth/profile").get(protect, profile);
export default authRouter;
