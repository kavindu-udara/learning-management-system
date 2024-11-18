import express from "express";
import { showImage } from "../controllers/imageController.js";

const router = express.Router();

router.get('/:fileName', showImage);

export default router;