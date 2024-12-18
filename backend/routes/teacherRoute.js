import express from "express";
import { verifyTeacher } from "../utils/verifyTeacher.js";
import { getTeacherOverview } from "../controllers/teacherController.js";

const router = express.Router();

router.get('/overview', verifyTeacher, getTeacherOverview);

export default router;