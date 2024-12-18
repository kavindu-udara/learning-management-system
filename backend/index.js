import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import videoRouter from "./routes/videoRouter.js";
import imageRouter from "./routes/imageRouter.js";
import cartRouter from "./routes/cartRouter.js";
import teacherRouter from "./routes/teacherRoute.js";

dotenv.config();

// connect to mongoDb
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to mongoDB");
}).catch((err) => {
    logger.error("MongoDB Connection Failed : " + err);
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

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/course', courseRouter);
apiRouter.use('/checkout', paymentRouter);
apiRouter.use('/video', videoRouter);
apiRouter.use('/image', imageRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/teacher', teacherRouter);

app.use('/api/v1', apiRouter);