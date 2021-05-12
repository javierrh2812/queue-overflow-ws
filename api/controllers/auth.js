import { Router } from 'express'
import { login } from '../services/auth'
//import jwtMiddleware from '../middlewares/jwtValidation'

let router = Router()

router.post('/login', login)

//router.post('/refreshToken', jwtMiddleware.require, authService.refreshToken);

export default router
