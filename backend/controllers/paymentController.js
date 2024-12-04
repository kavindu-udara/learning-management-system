import Stripe from 'stripe';
import dotenv from 'dotenv';
import Course from '../models/courseModel.js';
import { getCartByUserId, getCartTotalPrice } from './CartController.js';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const createIntent = async (price) => {
    const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(items),
        amount: price,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return paymentIntent;

}

export const createPaymentIntent = async (req, res, next) => {

    const courseId = req.params.courseId;

    const userId = req.user.id;

    if (!userId || !courseId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(401).json({ message: "Course not found" });
    }

    const coursePrice = course.price * 100;

    const paymentIntent = await createIntent(coursePrice);
    res.send({
        clientSecret: paymentIntent.client_secret,
        //! [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`
    });
}

export const createCartPaymentIntent = async (req, res) => {

    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await getCartByUserId(userId);
    const totalPrice = await getCartTotalPrice(cart);

    if (totalPrice !== 0) {
        const paymentIntent = await createIntent(totalPrice);
        res.send({
            clientSecret: paymentIntent.client_secret,
            //! [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`, totalPrice
        });
    } else {
        return res.status(401).json({ message: "Cart is empty" });
    }

}