import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    userId: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.provider === 'local'
        }
    },
    googleId: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: ""
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    profileDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const User = mongoose.model('User', UserSchema)

export default User;