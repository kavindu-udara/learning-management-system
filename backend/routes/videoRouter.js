import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { showVideo } from "../controllers/videoController.js";

const router = express.Router();

// TODO : if verify token checked video is not loading

// router.get('/:historyId', verifyToken, showVideo);
router.get('/:historyId', showVideo);

export default router;