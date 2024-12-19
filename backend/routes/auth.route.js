import express from "express";
import { googleAuthController, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleAuthController);

export default router;