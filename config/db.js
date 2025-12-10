import { connect } from "mongoose";
import { MONGODB_URI, CLOUD_MONGODB_URI, NODE_ENV } from "./index.js";

const dbConnection = async () => {
  try {
    const uri = NODE_ENV === "production" ? CLOUD_MONGODB_URI : MONGODB_URI;
    await connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default dbConnection;
