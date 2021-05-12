import mongoose, { createSchema } from './mongoose'

export const SCHEMA_NAME = 'answer'

const answerSchema = {
   question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question',
      required: [true, 'question is required']
   },
   description: {
      type: String,
      required: [true, 'decription is required']
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'author(user) is required']
   },
   votes: {
      type: Number,
      default: 0
   },
   isCorrect: {
      type: Boolean,
      default: false
   }
}

const Answer = createSchema(answerSchema)

export default mongoose.model(SCHEMA_NAME, Answer)
