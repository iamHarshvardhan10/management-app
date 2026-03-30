import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import AuthRouter from './routes/auth.router.js'
import { dabaseConnection } from './config/database.js'
import SuggestionsRouter from './routes/suggestions.router.js'
import UserRouter from './routes/user.router.js'
import LeavesRouter from './routes/leaves.router.js'
dotenv.config()

const app = express()
const PORT = 9000


app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)


app.get('/', (req, res) => {
    res.json({
        message: 'Server is running',
        success: true
    })
})

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/suggestion', SuggestionsRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/leaves', LeavesRouter)



app.listen(PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
    dabaseConnection()
})

