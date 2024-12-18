import mongoose from "mongoose";

const courseSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    }
}, {timestamps: true});

const CourseSection = mongoose.model('CourseSection', courseSectionSchema);
export default CourseSection;