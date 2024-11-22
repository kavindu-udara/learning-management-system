import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { showVideo, unlockVideo } from "../controllers/videoController.js";

const router = express.Router();

router.get('/:historyId', showVideo);
router.get('/unlock/:historyId', verifyToken, unlockVideo);

export default router;