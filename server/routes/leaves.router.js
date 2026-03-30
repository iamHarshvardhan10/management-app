import express from 'express'
import { createLeave } from '../controllers/leaves.controllers.js';
import { validateUser } from '../middlewares/auth.js';


const LeavesRouter = express.Router()


LeavesRouter.post('/leave-request', validateUser, createLeave)



export default LeavesRouter;