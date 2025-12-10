import { Router } from "express";
import { registerUser } from "../controllers/auth.js";
const authRouter = Router();

authRouter.route("/auth/register").post(registerUser);
export default authRouter;
