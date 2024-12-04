import Cart from "../models/CartModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";
import { addAdditionalDetailsToCourse } from "./courseController.js";


export const showCart = async (req, res) => {

    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const cart = await Cart.find({ userId: userId });

        let total = 0;
        // set course data to each cart object
        for (let i = 0; i < cart.length; i++) {
            const course = await Course.findById(cart[i].courseId);

            const updatedCourse = await addAdditionalDetailsToCourse(course, true);

            total = total + course.price;

            cart[i] = { ...cart[i]._doc, course: updatedCourse};
        }

        return res.status(200).json({ message: "Cart Fetched Successfully", cart, total  });
    } catch (err) {
        logger.error("while show cart : ", err);
        return res.status(500).json({ message: "Error while fetching cart" });
    };
}

export const createCart = async (req, res) => {

    const userId = req.user.id;

    const { courseId } = req.body;

    if (!userId || !courseId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cart = await Cart.find({ userId: userId, courseId: courseId });
        if (cart.length > 0) {
            return res.status(200).json({ message: "Already Exists in Cart", cart });
        }

        const newCart = new Cart({ courseId, userId });
        await newCart.save();

        return res.status(200).json({ message: "Added to Cart", cart: newCart });

    } catch (err) {
        logger.error("while create cart : ", err);
        return res.status(500).json({ message: "Error while adding to cart" });
    };
}

export const deleteCart = async (req, res) => {
    const userId = req.user.id;
    const courseId = req.params.courseId;

    if (!userId || !courseId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const cart = await Cart.findOneAndDelete({ userId: userId, courseId: courseId });
        return res.status(200).json({ message: "Deleted from Cart", cart });
    } catch (err) {
        logger.error("while delete cart : ", err);
        return res.status(500).json({ message: "Error while deleting from cart" });
    };

}

export const isInCart = async (userId, courseId) => {
    const cart = await Cart.find({ userId, courseId });
    if (cart.length > 0) {
        return true;
    }
    return false;
}