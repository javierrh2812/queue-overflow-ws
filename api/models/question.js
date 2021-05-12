import mongoose, {createSchema} from './mongoose'
export const SCHEMA_NAME = 'question'

const questionSchema = {
   title: {
      type: String,
      required: [true, 'title is required']
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
   votes:{
      type: Number,
      default: 0
   }
}

const Question = createSchema(questionSchema)

Question.virtual('answers', {
   ref: 'answer',
   localField: '_id',
   foreignField: 'question',
   justOne: false
})

Question.set('toObject', {virtuals:true})
Question.set('toJSON', {virtuals:true})

export default mongoose.model(SCHEMA_NAME, Question)
