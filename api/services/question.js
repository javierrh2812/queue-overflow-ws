import HttpStatus from 'http-status-codes'
import { WrongRefError, catchedError } from './errors/index'
import Question from '../models/question'

export const saveQuestion = async (req, res) => {
   try {
      const { description, title } = req.body

      if (!description || !title)
         return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'no auhor or title or description' })

      let temp = { author: req.user._id, description, title }

      let thisQuestion = await Question.create(temp)

      return res.status(HttpStatus.CREATED).json({
         message: 'Answer saved successfully',
         data: thisQuestion
      })
   } catch (error) {
      return catchedError(res, error, 'saveQuestion')
   }
}

export const getQuestion = async (req, res) => {
   try {
      let { id } = req.params

      let question = await Question.findById(id)
         .populate({ path: 'author', select: 'name email' })
         .populate('answers')

      if (!question) return WrongRefError(res, 'questionId')

      return res.status(HttpStatus.OK).json({
         message: 'answer fetched successfully',
         data: question
      })
   } catch (error) {
      return catchedError(res, error, 'getQuestion')
   }
}

export const getQuestionList = async (req, res) => {
   try {
      const populate = { path: 'author', select: 'name' }
      const { q } = req.query
      const query = { title: { $regex: q, $options: 'i' } }
      let questions = await Question.find(q=='undefined'? {}: query).limit(10).populate(populate).sort({createdAt:-1})
      return res.status(HttpStatus.OK).json({
         message: 'answer list fetched successfully',
         data: questions
      })
   } catch (error) {
      return catchedError(res, error, 'getQuestions')
   }
}
