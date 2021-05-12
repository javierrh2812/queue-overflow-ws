import User from '../models/user'
import {UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK} from 'http-status-codes'
import {checkPassword} from '../encryptors/bcryptor'
import {createToken, decodeToken} from '../encryptors/tokenizer'

export const login = [
   async (req, res) => {
      try {
         const { email, password } = req.body
         if (!email || !password) return res.status(BAD_REQUEST).json({message: 'missed : eemail or password'})
         let user = await User.findOne({email})
         if (!user) {
            return res.status(UNAUTHORIZED).json({
               message: 'email doesnt exists'
            })
         }
         if (!checkPassword(password, user.password)) {
            return res.status(UNAUTHORIZED).json({
               message: 'Wrong password'
            })
         }
       
         let userData = {
            id: user.id,
            name: user.name,
            email: user.email,
         }

         let token = createToken(userData)
         let decodedToken = decodeToken(token)
         
         userData.token = {
            token: token,
            expiresIn: (decodedToken.exp - decodedToken.iat) * 1000
         }

         return res.status(OK).json({
            message: 'Login successful',
            data: userData
         })

      } catch (error) {
         console.log(error)
         return res.status(INTERNAL_SERVER_ERROR).json({
            message: 'catched error at login'
         })
      }
   }
]

