import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    token: {
        type: String,
        default: null
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;