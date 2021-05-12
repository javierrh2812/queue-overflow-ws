import { Router } from 'express'
import {
   saveQuestion,
   getQuestion,
   getQuestionList
} from '../services/question'
import { validate } from '../middlewares/jwtValidation'

let router = Router()

router.post('/saveQuestion', validate, saveQuestion)
router.get('/getQuestion/:id', getQuestion)
router.get('/getQuestionList', getQuestionList)

export default router
