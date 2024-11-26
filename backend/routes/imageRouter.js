import express from "express";
import { showCourseImage, showImage } from "../controllers/imageController.js";

const router = express.Router();

router.get('/courseImage/:fileName', showImage);
router.get('/userImage/:fileName', showCourseImage);

export default router;