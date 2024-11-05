import Stripe from 'stripe';
import dotenv from 'dotenv';
import Course from '../models/courseModel.js';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let total = 10;
    items.forEach((item) => {
        // total += item.amount;
        total += item.price;
    });
    return total;
};

export const createPaymentIntent = async (req, res, next) => {

    const courseId = req.params.courseId;

    const {user} = req;
    const userId = user.id;

    
    if(!userId || !courseId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const course = Course.findById(courseId);

    if(!course){
        return res.status(401).json({ message: "Course not found" });
    }

    const coursePrice = course.price;

    // let totalPrice = 0;

    // items.map((item) => {
    //     let itemPrice = parseInt(item.price, 10);
    //     totalPrice += itemPrice * 100;
    // });

    // const price = getCoursePrice(courseId);

    // return res.status(200).json({ items: items[0].price });


    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(items),
        amount: coursePrice,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        //! [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`
    });
}