import jwt from 'jsonwebtoken'


export const validateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing'
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.user = decoded;
            next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token'
        })
    }
}