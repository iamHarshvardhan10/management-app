import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").populate('profileDetails');

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching users"
        });
    }
};