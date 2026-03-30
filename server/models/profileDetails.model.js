import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    experience: {
        type: Number,
        default: 0
    },
    designation: {
        type: String,
        default: ""
    },
    thumbnailImage: {
        type: String,
        default: ""
    },

    leaveBalance: {
        totalLeaves: { type: Number, default: 18, min: 0 },
        leavesTaken: { type: Number, default: 0 },
        remainingLeaves: { type: Number, default: 18 }
    }

}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;