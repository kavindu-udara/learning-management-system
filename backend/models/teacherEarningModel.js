import mongoose from "mongoose";

const teacherEarningSchema = new mongoose.Schema({
    teacherId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    courseId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const TeacherEarning = mongoose.model('TeacherEarning', teacherEarningSchema);
export default TeacherEarning;