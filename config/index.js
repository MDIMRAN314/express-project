// import "dotenv/config";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CLOUD_MONGODB_URI = process.env.CLOUD_MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_SECONDS = process.env.JWT_EXPIRE_SECONDS;
