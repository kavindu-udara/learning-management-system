import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCart, deleteCart } from "../controllers/CartController.js";

const router  = express.Router();

router.post('/add', verifyToken, createCart);
router.delete('/:courseId', verifyToken, deleteCart);

export default router;