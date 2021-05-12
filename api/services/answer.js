import HttpStatus from 'http-status-codes'
import { WrongRefError, catchedError } from './errors/index'
import Answer from '../models/answer'
import Question from '../models/question'

export const saveAnswer = async (req, res) => {
   try {
      const {description, question } = req.body

      console.log(req.user)

      if (!description || !question)
         return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'no description or question' })

      //let authorRef = await User.findById(author)
      //if (!authorRef) return WrongRefError(res, 'Author id')

      let questionRef = await Question.findById(question)
      if (!questionRef) return WrongRefError(res, 'Question id')

      let tempAnswer = {
         author: req.user._id,
         description,
         question
      }

      let thisAnswer = await Answer.create(tempAnswer)

      return res.status(HttpStatus.CREATED).json({
         message: 'Answer saved successfully',
         data: thisAnswer
      })
   } catch (error) {
      return catchedError(res, error, 'saveAnswer')
   }
}

export const getAnswer = async (req, res) => {
   try {
      let { id } = req.params

      let answer = await Answer.findById(id)
      if (!answer) return WrongRefError(res, 'survey id')

      return res.status(HttpStatus.OK).json({
         message: 'Survey fetched successfully',
         data: answer
      })
   } catch (error) {
      return catchError(res, error, 'getAnswer')
   }
}
