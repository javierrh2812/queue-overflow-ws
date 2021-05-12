import mongoose, { createSchema, ObjectId } from './mongoose'
export const SCHEMA_NAME = 'user'

const UserSchema = {
   name: {
      type: String,
      required: [true, 'name is required']
   },
   email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true
   },
   password: {
      type: String,
      required: [true, 'password is required']
   }, 
   questionUpvotes: {
      type: [{type: ObjectId, ref: 'question'}], 
      default: []
   },
   questionDownvotes: {
      type: [{type: ObjectId, ref: 'question'}], 
      default: []
   },
   answerUpvotes: {
      type: [{type: ObjectId, ref: 'answer'}], 
      default: []
   },
   answerDownvotes: {
      type: [{type: ObjectId, ref: 'answer'}], 
      default: []
   },
}

const User = createSchema(UserSchema, SCHEMA_NAME)


User.methods.questionUpvote = function(id){
  if(this.questionUpvotes.indexOf(id) === -1) this.questionUpvotes.push(id);
  this.questionDownvote.remove(id)
  return this.save();
};

User.methods.questionDownvote = function(id){
  if(this.questionDownvotes.indexOf(id) === -1) this.questionDownvotes.push(id);
  this.questionUpvote.remove(id)
  return this.save();
};

export default mongoose.model(SCHEMA_NAME, User)
