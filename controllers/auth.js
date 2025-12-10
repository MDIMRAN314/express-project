import UserModel from "../models/User.js";

/* -------- @DESC POST ROUTES -------------
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
