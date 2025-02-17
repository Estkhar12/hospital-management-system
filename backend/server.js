import express from "express";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudnary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoint
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
