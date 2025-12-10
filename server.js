import express from "express";
import cors from "cors";
import { PORT } from "./config/index.js";
import authRouter from "./routes/authRoute.js";
import dbConnection from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const InitializeServer = async () => {
  try {
    await dbConnection();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

app.use("/api/v1", authRouter);

InitializeServer();
