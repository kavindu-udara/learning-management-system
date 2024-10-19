import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

// connect to mongoDb
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to mongoDB");
}).catch((err) => {
    console.log(err);
})

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}.`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);