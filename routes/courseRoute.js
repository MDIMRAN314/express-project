import { Router } from "express";
import { protect, role } from "../middlewares/authMiddleware.js";
import { profile } from "../controllers/profile.js";
import { createCourse } from "../controllers/course/courseController.js";
const courseRouter = Router();
courseRouter
  .route("/course/create")
  .post(protect, role("publisher"), createCourse);

export default courseRouter;
