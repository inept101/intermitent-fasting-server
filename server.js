import express, { Router } from "express";
import env from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";

import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/user", userRoutes);

env.config();

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  });

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "server is test",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
