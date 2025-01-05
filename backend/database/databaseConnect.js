import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = () => {
    // connect to mongoDb
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to mongoDB");
    }).catch((err) => {
        logger.error("MongoDB Connection Failed : " + err);
        console.log(err);
    })
}

export const disconnectDatabse = () => {
    mongoose.disconnect();
}
