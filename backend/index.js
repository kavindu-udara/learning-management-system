import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import paymentRouter from "./routes/payment.route.js";
import videoRouter from "./routes/video.router.js";
import imageRouter from "./routes/image.route.js";
import cartRouter from "./routes/cart.route.js";
import teacherRouter from "./routes/teacher.route.js";
import { connectDatabase } from "./database/databaseConnect.js";

dotenv.config();

connectDatabase();

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