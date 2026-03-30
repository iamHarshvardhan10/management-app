import ComplaintsSuggestion from "../models/complaintsSuggestion.model.js";


export const addSuggestions = async (req, res) => {
    try {
        const { subject, suggestions } = req.body;

        if (!subject || !suggestions) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are Required'
            })
        }

        const userId = req.user.id;

        const newSuggestion = await ComplaintsSuggestion.create({
            subject,
            suggestions,
            userInfo: userId
        })

        return res.status(201).json({
            success: true,
            message: 'Suggestion Submitted Successfully',
            data: newSuggestion
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}


export const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await ComplaintsSuggestion.find()
            .populate("userInfo", "email name");

        return res.status(200).json({
            success: true,
            data: suggestions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching suggestions",
        });
    }
};