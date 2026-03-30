import express from 'express'
import { validateUser } from '../middlewares/auth.js';
import { addSuggestions, getAllSuggestions } from '../controllers/suggestions.controllers.js';

const SuggestionsRouter = express.Router()

SuggestionsRouter.post('/add', validateUser, addSuggestions)
SuggestionsRouter.get('/all', getAllSuggestions)


export default SuggestionsRouter;