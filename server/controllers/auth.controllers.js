import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import Profile from "../models/profileDetails.model.js";
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



export const createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'All Fields Required',
                success: false
            });
        }

        console.log(email)
        console.log(password)

        const checkEmailPresent = await User.findOne({ email });

        if (checkEmailPresent) {
            return res.status(400).json({
                message: 'Email Already Present! Please Login to Continue',
                success: false,
                error: 'Email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            userId: uuidv4(),
            password: hashedPassword,
            provider: 'local',
        });

        const profileDetails = await Profile.create({
            userId: user._id
        });


        user.profileDetails = profileDetails._id;
        await user.save();

        return res.status(201).json({
            message: 'Account Created Successfully',
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'All Fields are Required',
                success: false
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'Email does not exist! Please create account',
                success: false
            })
        }

        if (user.provider === "google") {
            return res.status(400).json({
                message: "Please login using Google",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id, userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                token,
                user,
                message: "User Login Success",
            });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        })
    }
}



export const googleAuth = async (req, res) => {
    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Credential missing"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            sub,
            email,
            name,
            picture
        } = payload;

        let user = await User.findOne({ email });

        if (!user) {

            const profileDetails = await Profile.create({});

            user = await User.create({
                name,
                email,
                googleId: sub,
                profilePic: picture,
                provider: "google",
                userId: uuidv4(),
                isVerified: true,
                profileDetails: profileDetails._id
            });

        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Google Login Successful",
            token,
            user
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};