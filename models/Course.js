import { Schema, model } from "mongoose";

const CourseSchema = new Schema(
  {
    courseTitle: { type: String, required: [true, "Course title is required"] },
    body: {
      type: String,
      required: true,
      minlength: [20, "Course description must be at least 20 characters"],
    },
    avatar: {
      type: String,
      default:
        "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

const CourseModel = model("course", CourseSchema);

export default CourseModel;
