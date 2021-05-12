import { Router } from 'express'
import { createUser } from '../services/user'
//import jwtMiddleware from '../middlewares/jwtValidation'

let router = Router()

router.post('/', createUser)

export default router

