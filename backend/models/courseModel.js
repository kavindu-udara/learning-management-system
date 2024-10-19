import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coursecategories',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
export default Course;