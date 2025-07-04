import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB 🔥");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

import developerRoutes from "./routes/developerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import timeSheetRoutes from "./routes/timeSheetRoutes.js";

app.use("/api/developers", developerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/time-sheets", timeSheetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
