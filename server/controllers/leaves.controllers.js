import leaveRequestTemplate from "../mail/leaveRequestTemplates.js";
import Leaves from "../models/leaves.model.js";
import mailSender from "../utils/mailSender.js";

export const createLeave = async (req, res) => {
    try {
        const {
            leaveSubject,
            leaveReasons,
            leaveType,
            fromDate,
            toDate,
        } = req.body;


        if (!leaveSubject || !leaveReasons || !fromDate || !toDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (new Date(fromDate) > new Date(toDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date range",
            });
        }

        const userId = req.user.id;
        const userEmail = req.user.email;

        const leave = await Leaves.create({
            leaveSubject,
            leaveReasons,
            leaveType,
            fromDate,
            toDate,
            userId,
        });

        console.log(leave)


        const totalDays =
            (new Date(toDate) - new Date(fromDate)) /
            (1000 * 60 * 60 * 24) +
            1;


        const formattedFrom = new Date(fromDate).toDateString();
        const formattedTo = new Date(toDate).toDateString();

        const formattedBody = leaveReasons
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

        const leaveMail = await mailSender(
            userEmail,
            leaveSubject,
            leaveRequestTemplate({
                userEmail,
                leaveSubject,
                leaveType,
                fromDate: formattedFrom,
                toDate: formattedTo,
                totalDays,
                leaveReasons: formattedBody,
            })
        );

        console.log(leaveMail)

        return res.status(201).json({
            success: true,
            message: "Leave request submitted successfully",
            data: leave,
            mail: leaveMail
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating leave request",
        });
    }
};