import {Router} from 'express';
import {saveAnswer} from '../services/answer';
import {validate} from '../middlewares/jwtValidation'

let router = Router();
router.post('/saveAnswer', validate, saveAnswer)
export default router
