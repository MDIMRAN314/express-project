import CourseModel from "../../models/Course.js";
import UserModel from "../../models/User.js";
/* -------- @DESC POST ROUTES -------------
@ACCESS PRIVATE 
@ROUTE /api/v1/course/create
@ROLE ['ADMIN', 'publisher']
@ENDPOINT http://localhost:5000/api/v1/course/create
It has request payload
@CONTENT-Type application/json
 */

export const createCourse = async (req, res, next) => {
  try {
    const { courseTitle, body, avatar } = req.body;
    // const newCourse = new UserModel({ courseTitle, body, avatar, user });
    // await newCourse.save();
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newCourse = await CourseModel.create({
      courseTitle,
      body,
      avatar,
      user,
      //   user: req.user.id, // Entire user object
    });
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
