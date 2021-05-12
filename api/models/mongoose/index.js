import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

mongoose.connection.on('error', (error) =>
   console.log(`Database error: ${error}`)
)
mongoose.connection.once('open', (_) => {
   if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true)
   console.log(`Connected to database ${process.env.DB_NAME}`)
})

export function inMongoId() {
   return mongoose.Types.ObjectId.isValid(value)
}

export function createSchema(schema) {
   return mongoose.Schema(schema, { timestamps: true, versionKey: false })
}

export function newMongoId(idString){
   return mongoose.Types.ObjectId(idString) 
}

export const ObjectId = mongoose.Schema.Types.ObjectId 
export default mongoose
