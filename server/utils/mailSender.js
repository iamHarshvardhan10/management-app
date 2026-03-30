import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const mailSender = async (userEmail, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: false,
        })



        let info = await transporter.sendMail({
            from: `"Leave Request" <${process.env.MAIL_USER}>`,
            to: `shreeharshpb11@gmail.com`,
            cc: [`coderharsh10@gmail.com`],
            subject: `${title}`,
            html: `${body}`,
            replyTo: `${userEmail}`
        })
        console.log(info.response)
        return info

    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export default mailSender;