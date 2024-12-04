import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        require: true
    }
}, {timestamps: true});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;