/* -------- @DESC GET ROUTES -------------
@PROFILE
@ACCESS PRIVATE 
@ROUTE /api/v1/user/profile
@ENDPOINT http://localhost:5000/api/v1/user/profile
It has request payload
@CONTENT-Type application/json
 */

import UserModel from "../models/User.js";

export const profile = async (req, res, next) => {
  console.log("req: ", req);
  console.log("req user: ", req.user);
  try {
    const profile = await UserModel.findById(req.user.id).select("-password");
    // const user = req.user; // Retrieved from authMiddleware
    res.status(200).json({ success: true, profile });
    next();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
