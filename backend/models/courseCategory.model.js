import mongoose from "mongoose";

const courseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const CourseCategory = mongoose.model('CourseCategory', courseCategorySchema);
export default CourseCategory;