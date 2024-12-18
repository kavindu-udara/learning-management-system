import TeacherEarning from "../models/teacherEarning.model.js";

export const storeTeacherEarnings = async (teacherId, userId, courseId, price) => {
    const teacherEarning = new TeacherEarning({ teacherId, userId, courseId, price });
    await teacherEarning.save();
}