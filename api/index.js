import { Router } from 'express'

import authController from './controllers/auth'
import userController from './controllers/user'
import questionController from './controllers/question'
import answerController from './controllers/answer'

let router = Router()
router.use('/auth', authController)
router.use('/users', userController)
router.use('/question', questionController)
router.use('/answer', answerController)

export default router
