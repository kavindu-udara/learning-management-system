import User from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
        return res.status(400).json({ message: "All fields are required" });
    } else {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            } else {

                user.fname = fname;
                user.lname = lname;
                user.email = email;
                await user.save();

                return res.status(200).json({ message: "User updated successfully", user });
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