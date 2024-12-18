import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    coursePartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseparts',
        required: true
    },
    watchedTime: {
        type: Number,
        required: false
    },
    isLocked: {
        type: Boolean,
        required: false,
        default: true
    }
}, { timestamps: true });

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);
export default WatchHistory;