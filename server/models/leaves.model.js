import mongoose from 'mongoose'

export const leaveSchema = new mongoose.Schema({
    leaveSubject: {
        type: String,
        required: true,
    },
    leaveReasons: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick', 'Casual', 'Paid'],
        default: 'Casual'
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Leaves = mongoose.model('Leave', leaveSchema)

export default Leaves;