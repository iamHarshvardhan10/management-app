import mongoose from 'mongoose'

export const complaintsSuggestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    suggestions: {
        type: String,
        required: true
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const ComplaintsSuggestion = mongoose.model('Suggestions', complaintsSuggestionSchema)

export default ComplaintsSuggestion;