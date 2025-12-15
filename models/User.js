import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { genSalt, compare, hash } from "bcryptjs";
import { JWT_EXPIRE_SECONDS, JWT_SECRET } from "../config/index.js";

const UserSchema = new Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: true,
      unique: [true, "Email must be unique"],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    role: { type: String, enum: ["User", "Publisher"], default: "User" },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      ],
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Method to compare entered password with hashed password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Method to sign in user and return JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_SECONDS,
  });
};

const UserModel = model("user", UserSchema);

export default UserModel;
