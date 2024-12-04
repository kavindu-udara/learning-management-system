import express from "express";
import { createCartPaymentIntent, createPaymentIntent } from "../controllers/paymentController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createPurchasedCourse } from "../controllers/purchasedCourseController.js";
import { createPurchasedCart } from "../controllers/CartController.js";

const router = express.Router();

router.post('/create-payment-intent/course/:courseId', verifyToken, createPaymentIntent);
router.post('/create-payment-intent/cart', verifyToken, createCartPaymentIntent);

// success routes
router.post('/course-purchased', verifyToken, createPurchasedCourse);
router.post('/cart-purchased', verifyToken, createPurchasedCart);

export default router;