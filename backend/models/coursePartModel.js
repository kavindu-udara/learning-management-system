import mongoose from "mongoose";

const coursePartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coursesections',
        required: true
    }
}, { timestamps: true });

const CoursePart = mongoose.model('CoursePart', coursePartSchema);
export default CoursePart;