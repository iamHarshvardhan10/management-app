import express from 'express'
import { createAccount, login } from '../controllers/auth.controllers.js';

const AuthRouter = express.Router()


AuthRouter.post('/create-account', createAccount)
AuthRouter.post('/login', login)


export default AuthRouter;