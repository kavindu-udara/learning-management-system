import Course from "../models/course.model.js";
import TeacherEarning from "../models/teacherEarning.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import { addUserProfileUrl } from "./user.controller.js";

export const getTeacherOverview = async (req, res) => {
    try {
        const teacherId = req.user.id;

        if (!teacherId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const teacherCourses = await Course.find({ teacherId: teacherId });

        const teacherEarning = await TeacherEarning.find({ teacherId: teacherId });

        let earnings = 0;
        const updatedTeacherEarnings = await Promise.all(teacherEarning.map(async (earn) => {
            const user = await User.findById(earn.userId);
            user.imageUrl = addUserProfileUrl(user.imageUrl);
            earnings += earn.price;
            const course = await Course.findById(earn.courseId);
            return { ...earn._doc, user, course };
        }));

        return res.status(200).json({ courses: teacherCourses, salesHistory: updatedTeacherEarnings, earnings });
    } catch (err) {
        logger.error("Error while showing teacher overview : ", err);
        return res.status(500).json({ message: "Error while showing teacher overview" });
    }
}