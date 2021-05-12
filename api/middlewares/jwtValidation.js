import {UNAUTHORIZED} from 'http-status-codes'
import { verifyToken } from '../encryptors/tokenizer'
import User from '../models/user'
import {catchedError} from '../services/errors'

export const require = (req, res, next) => {
   let authorization = req.headers.authorization
   try {
      if (authorization) {
         authorization = authorization.split(' ')
         if (authorization[0] !== 'Bearer') 
            return res.status(UNAUTHORIZED).json({
               message: 'Token is invalid'
            })
         req.jwt = authorization[1]
         if (next) return next()

      } else 
         return res.status(UNAUTHORIZED).json({
            message: 'No token provided'
         })
      
   } catch (error) {
      return catchedError(res,error, 'requireToken')
   }
}

export const validate = async (req, res, next) =>  {
   try {
      require(req, res)
      const decoded =  verifyToken(req.jwt)
      req.user = decoded 
      req.user = await User.findOne({_id: req.user.id,email: req.user.email})
      if (!req.user) return res.status(UNAUTHORIZED).json({message: 'Access forbidden'})
      return next()
   } catch (error) {
      return res.status(UNAUTHORIZED).json({message: 'invalid token'})
      //return catchedError(res,error, 'validateToken')
   }
}

