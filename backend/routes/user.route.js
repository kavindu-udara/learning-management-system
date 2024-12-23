import express from "express";
import { updatePassword, updateToTeacher, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { uploadProfileImage } from "../utils/uploadConfig.js";

const router = express.Router();

router.put('/:id', verifyToken, uploadProfileImage.single('profileImage'), updateUser);
router.get('/:id/update-to-teacher', verifyToken, updateToTeacher);
router.put('/:id/change-password', verifyToken, updatePassword);

export default router;