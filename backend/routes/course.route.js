import express from "express";
import { createCategory, createCourse, createCoursePart, createCourseSection, deleteCourse, deletePart, deleteSection, entrollCourse, showCourseById, showCourseCategories, showCourses, showCoursesByTeacherId, updateCourse, updatePart, updateSection } from "../controllers/course.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyTeacher } from "../utils/verifyTeacher.js";
import { uploadCourseImage, uploadVideo } from "../utils/uploadConfig.js";

const router = express.Router();

//! seeder
// router.get('/create', createCategory);

router.get('/', showCourses);

router.get('/categories', showCourseCategories);
router.post('/create', verifyToken, uploadCourseImage.single('courseImage'), createCourse);

router.post('/create-section', verifyTeacher, createCourseSection);
router.post('/create-part', verifyTeacher, uploadVideo.single('videoFile'), createCoursePart);

router.get('/:id', showCourseById);

router.get('/entroll/:courseId', verifyToken, entrollCourse);

router.get('/teacher/:teacherId', showCoursesByTeacherId);

// update routes
router.put('/:id', verifyTeacher, uploadCourseImage.single('courseImage'), updateCourse);
router.put('/section/:id', verifyTeacher, updateSection);
router.post('/update-part/:id', verifyTeacher, uploadVideo.single('videoFile'), updatePart);       

// delete routes
router.delete('/:id', verifyTeacher, deleteCourse);
router.delete('/section/:id', verifyTeacher, deleteSection);
router.delete('/part/:id', verifyTeacher, deletePart);

export default router;