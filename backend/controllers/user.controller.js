import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import { validatePassword } from "../utils/regexValidator.js";
import bcryptjs from "bcryptjs";

export const addUserProfileUrl = (imageUrl) => {
    let baseUrl = "http://127.0.0.1:8000/api/v1/image/userImage/";
    // update image Url value
    if (imageUrl) {
        // Prepend the base URL to the existing imageUrl
        return `${baseUrl}${imageUrl}`;
    } else {
        // Add the default image URL if imageUrl does not exist
        return `${baseUrl}default.png`;
    }
}

export const updateUser = async (req, res, next) => {
    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
        return res.status(400).json({ message: "All fields are required" });
    } else {
        try {
            const profileImage = req.file;

            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            } else {

                user.fname = fname;
                user.lname = lname;
                user.email = email;

                if (profileImage) {
                    user.imageUrl = profileImage.filename;
                }

                await user.save();

                const { token, password, ...others } = user._doc;
                others.imageUrl = addUserProfileUrl(others.imageUrl);
                // let baseUrl = "http://127.0.0.1:8000/api/v1/image/userImage/";
                // // update image Url value
                // if (others.imageUrl) {
                //     // Prepend the base URL to the existing imageUrl
                //     others.imageUrl = `${baseUrl}${others.imageUrl}`;
                // } else {
                //     // Add the default image URL if imageUrl does not exist
                //     others.imageUrl = `${baseUrl}default.png`;
                // }

                return res.status(200).json({ message: "User updated successfully", user: others });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export const updateToTeacher = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        } else {

            user.role = "teacher";
            await user.save();

            return res.status(200).json({ message: "User updated successfully", user });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    } else if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: "Invalid Password" });
    } else {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            } else {

                const isMatch = await bcryptjs.compare(oldPassword, user.password);

                if (!isMatch) {
                    return res.status(400).json({ message: "Old password is wrong" });
                } else {
                    user.password = await bcryptjs.hash(newPassword, 12);
                    await user.save();

                    return res.status(200).json({ message: "Password updated successfully" });
                }
            }
        } catch (err) {
            logger.error("While updating user password", err.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}