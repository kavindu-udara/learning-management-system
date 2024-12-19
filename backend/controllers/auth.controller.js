import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { validateEmail, validateName, validatePassword } from "../utils/regexValidator.js";
import { addUserProfileUrl } from "./user.controller.js";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1w" });
}

const generateRandomString = () => {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    // Ensure at least one digit, one lowercase letter, and one uppercase letter
    randomString += charset[Math.floor(Math.random() * 10) + 52]; // Digit
    randomString += charset[Math.floor(Math.random() * 26)];       // Lowercase letter
    randomString += charset[Math.floor(Math.random() * 26) + 26]; // Uppercase letter

    // Fill the rest of the string length with random characters
    for (let i = 3; i < length; i++) {
        randomString += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the string to ensure random distribution
    randomString = randomString.split('').sort(() => Math.random() - 0.5).join('');

    return randomString;
}

export const signup = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } else if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: "The password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter" });
    } else if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    } else if (!validateName(fname)) {
        return res.status(400).json({ message: "Invalid first name" });
    } else if (!validateName(lname)) {
        return res.status(400).json({ message: "Invalid last name" });
    } else {

        const alreadyExistUser = await User.findOne({ email });
        if (alreadyExistUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

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

export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } else if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    } else if (!validatePassword(password)) {
        return res.status(400).json({ message: "Invalid Password" });
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

                    const { token, password, ...others } = user._doc;

                    const accessToken = generateToken(others._id, others.role);

                    // update token in db
                    await User.updateOne({ _id: others._id }, { $set: { token } });

                    others.imageUrl = addUserProfileUrl(others.imageUrl);

                    return res.cookie("access_token", accessToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(200).json({ message: "User logged in successfully", user: others });
                }
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

    }
}



export const googleAuthController = async (req, res) => {
    const { fname, lname, email } = req.body;

    // generate a random password
    const generatedPassword = generateRandomString();

    if (!fname || !lname || !email || !generatedPassword) {
        return res.status(400).json({ message: "All fields are required" });
    } else if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    } else if (!validateName(fname)) {
        return res.status(400).json({ message: "Invalid first name" });
    } else if (!validateName(lname)) {
        return res.status(400).json({ message: "Invalid last name" });
    } else {

        try {

            let user = {};
            const alreadyExistUser = await User.findOne({ email });
            if (alreadyExistUser) {
                user = alreadyExistUser;
            } else {
                const hashedPassword = await bcryptjs.hash(password, 12);
                user = new User({ fname, lname, email, password: hashedPassword });
                await user.save();
            }

            const { password, ...others } = user._doc;
            const token = generateToken(others._id, others.role);

            others.imageUrl = addUserProfileUrl(others.imageUrl);

            //save generated token in db
            user.token = token;
            await user.save();

            return res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(201).json({ message: "User created successfully", user: others });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}