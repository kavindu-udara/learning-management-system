import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCart, deleteCart, showCart } from "../controllers/CartController.js";

const router  = express.Router();

// TODO : bind course data to cart response
router.post('/', verifyToken, showCart);
router.post('/add', verifyToken, createCart);
router.delete('/:courseId', verifyToken, deleteCart);

export default router;