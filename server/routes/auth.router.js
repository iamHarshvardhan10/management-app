import express from 'express'
import { createAccount, googleAuth, login } from '../controllers/auth.controllers.js';

const AuthRouter = express.Router()


AuthRouter.post('/create-account', createAccount)
AuthRouter.post('/login', login)
AuthRouter.post("/google-auth", googleAuth);


export default AuthRouter;