import CoursePart from "../models/coursePartModel.js";
import CourseSection from "../models/courseSectionModel.js";
import PurchasedCourse from "../models/purchasedCourseModel.js";
import WatchHistory from "../models/watchHistoryModel.js";

export const createPurchasedCourse = async (req, res, next) => {

    const { user } = req;
    const userId = user.id;

    const { courseId, purchasedPrice } = req.body;

    if (!userId || !courseId || !purchasedPrice) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const purchasedCourse = new PurchasedCourse({ userId, courseId, purchasedPrice });
        await addCoursePartsToWatchHistory(courseId, userId);
        await purchasedCourse.save();
        return res.status(201).json({ message: "Purchased course created successfully", purchasedCourse });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const addCoursePartsToWatchHistory = async (courseId, userId) => {
    const courseParts = await findPartsByCourseId(courseId);
    courseParts.map((part) => {
        const watchHistory = new WatchHistory({ userId, coursePartId: part._id });
        watchHistory.save();
    })
}

const findPartsByCourseId = async (courseId) => {
    const courseSections = await CourseSection.find({ courseId: courseId });
    const sectionIds = courseSections.map(section => section._id);
    const courseParts = await CoursePart.find({ sectionId: { $in: sectionIds } });

    return courseParts;
}