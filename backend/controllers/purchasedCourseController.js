import PurchasedCourse from "../models/purchasedCourseModel.js";

export const createPurchasedCourse = async (req, res, next) => {

    const { user } = req;
    const userId = user.id;

    const { courseId, purchasedPrice } = req.body;

    if (!userId || !courseId || !purchasedPrice) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const purchasedCourse = new PurchasedCourse({ userId, courseId, purchasedPrice });
        await purchasedCourse.save();
        return res.status(201).json({ message: "Purchased course created successfully", purchasedCourse });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}