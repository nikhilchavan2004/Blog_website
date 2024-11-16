import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
const app = express();

dotenv.config();
const MONGO_URI = process.env.MONGO;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/routes", userRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000 !!");
});
