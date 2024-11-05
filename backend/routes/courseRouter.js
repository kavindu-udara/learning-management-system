import express from "express";
import { createCategory, createCourse, createCoursePart, createCourseSection, deleteCourse, deletePart, deleteSection, showCourseById, showCourseCategories, showCourses, showCoursesByTeacherId, updateCourse, updatePart, updateSection } from "../controllers/courseController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyTeacher } from "../utils/verifyTeacher.js";
import upload from "../utils/uploadConfig.js";

const router = express.Router();

//! seeder
// router.get('/create', createCategory);

router.get('/', showCourses);

router.get('/categories', showCourseCategories);
router.post('/create', verifyToken, createCourse);

router.post('/create-section', verifyTeacher, createCourseSection);
router.post('/create-part', verifyTeacher, upload.single('videoFile'), createCoursePart);

router.get('/:id', showCourseById);

router.get('/teacher/:teacherId', showCoursesByTeacherId);

// update routes
router.put('/:id', verifyTeacher, updateCourse);
router.put('/section/:id', verifyTeacher, updateSection);
router.post('/update-part/:id', verifyTeacher, upload.single('videoFile'), updatePart);

// delete routes
router.delete('/:id', verifyTeacher, deleteCourse);
router.delete('/section/:id', verifyTeacher, deleteSection);
router.delete('/part/:id', verifyTeacher, deletePart);

// purchase course
router.post('/purchase', verifyToken);

export default router;