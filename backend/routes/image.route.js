import express from "express";
import { showCourseImage, showImage } from "../controllers/image.controller.js";

const router = express.Router();

router.get('/courseImage/:fileName', showImage);
router.get('/userImage/:fileName', showCourseImage);

export default router;