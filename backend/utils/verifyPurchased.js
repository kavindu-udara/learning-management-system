import Course from "../models/courseModel.js";
import CoursePart from "../models/coursePartModel.js";
import CourseSection from "../models/courseSectionModel.js";
import PurchasedCourse from "../models/purchasedCourseModel.js";

export const verifyPurchased = async (req, res, next) => {
    const userId = req.user.id;
    const partId = req.params.partId;

    const part = await CoursePart.findById(partId);

    if(!part){
        return res.status(401).json({ message: "Part not found" });
    }

    const section = await CourseSection.findById(part.sectionId);

    if(!section){
        return res.status(401).json({ message: "Section not found" });
    }

    const course = await Course.findById(section.courseId);

    if(!course){
        return res.status(401).json({ message: "Course not found" });
    }

    if (!isUserPurchasedCourse(userId, course._id)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}

const isUserPurchasedCourse = (userId, courseId) => {
    const purchasedCourse = PurchasedCourse.find({ courseId, userId });
    if (purchasedCourse) {
        return true;
    }
    return false;
}