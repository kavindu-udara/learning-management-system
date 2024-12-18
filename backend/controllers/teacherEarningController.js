import TeacherEarning from "../models/teacherEarningModel.js";

export const storeTeacherEarnings = async (teacherId, userId, courseId, price) => {
    const teacherEarning = new TeacherEarning({ teacherId, userId, courseId, price });
    await teacherEarning.save();
}