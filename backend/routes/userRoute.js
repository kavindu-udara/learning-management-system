import express from "express";
import { updateToTeacher, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put('/:id', verifyToken, updateUser);
router.get('/:id/update-to-teacher', verifyToken, updateToTeacher);

export default router;