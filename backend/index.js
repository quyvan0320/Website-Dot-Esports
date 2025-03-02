import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import postRoute from "./routes/postRoute.js";
import topicRoute from "./routes/topicRoute.js";
const app = express();
const port = 5000 || process.env.PORT;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/topic", topicRoute);
app.use("/api/post", postRoute);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
connectDB();

app.listen(port, () => console.log(`server đang chạy trên cổng ${port}`));
