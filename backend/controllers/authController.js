import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1w" });
}
export const signup = async (req, res, next) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } else if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ message: "Invalid email address" });
    } else {

        const hashedPassword = await bcryptjs.hash(password, 12);

        const user = new User({ fname, lname, email, password: hashedPassword });

        try {
            await user.save();

            const { password, ...others } = user._doc;

            const token = generateToken(others._id, others.role);

            //save generated token in db
            user.token = token;
            await user.save();

            return res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(201).json({ message: "User created successfully", user: others });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } else {

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            } else {

                const isMatch = await bcryptjs.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                } else {

                    const { password, ...others } = user._doc;

                    const token = generateToken(others._id, others.role);

                    // update token in db
                    await User.updateOne({ _id: others._id }, { $set: { token } });

                    return res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(200).json({ message: "User logged in successfully", user: others });
                }
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

    }
}