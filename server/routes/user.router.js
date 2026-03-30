import express from 'express'
import { getAllUsers } from '../controllers/user.controllers.js';

const UserRouter = express.Router()


UserRouter.get('/all', getAllUsers)


export default UserRouter;