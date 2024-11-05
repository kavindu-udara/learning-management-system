import mongoose from "mongoose";

const purchasedCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    purchasedPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PurchasedCourse = mongoose.model('PurchasedCourse', purchasedCourseSchema);
export default PurchasedCourse;