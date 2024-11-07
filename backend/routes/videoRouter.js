import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { showVideo } from "../controllers/videoController.js";
import { verifyPurchased } from "../utils/verifyPurchased.js";

const router = express.Router();

// TODO : add verify token and check is user paid or not

router.get('/:partId', showVideo);

export default router;