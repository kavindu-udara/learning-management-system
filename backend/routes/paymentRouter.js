import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createPurchasedCourse } from "../controllers/purchasedCourseController.js";

const router = express.Router();

router.post('/create-payment-intent/:courseId', verifyToken, createPaymentIntent);
router.post('/course-purchased', verifyToken, createPurchasedCourse);

export default router;