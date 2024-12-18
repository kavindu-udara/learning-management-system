import express from "express";
import { createCartPaymentIntent, createPaymentIntent } from "../controllers/payment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createPurchasedCourse } from "../controllers/purchasedCourse.controller.js";
import { createPurchasedCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post('/create-payment-intent/course/:courseId', verifyToken, createPaymentIntent);
router.post('/create-payment-intent/cart', verifyToken, createCartPaymentIntent);

// success routes
router.post('/course-purchased', verifyToken, createPurchasedCourse);
router.post('/cart-purchased', verifyToken, createPurchasedCart);

export default router;