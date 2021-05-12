import { INTERNAL_SERVER_ERROR, CONFLICT } from 'http-status-codes'
export const catchedError = (res, error, service) => {
   console.log('catched error: ', error)
   return res.status(INTERNAL_SERVER_ERROR).json({
      //code: ErrorCodes.SOMETHING_WENT_WRONG.code,
      //message: ErrorCodes.SOMETHING_WENT_WRONG.message
      message: `Something went wrong`,
      description: `Catched error at ${service}`
   })
}
export const WrongRefError = (res, field) =>
   res.status(CONFLICT).json({ message: `Wrong ref to ${field}` })

export const AlreadyExistsError = (res, value) =>
   res.status(CONFLICT).json({ message: `${value} already exists` })
