import User from '../models/user'
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR} from 'http-status-codes'
import { encryptPassword } from '../encryptors/bcryptor'

//TODO checkshema
export const createUser = [
   async (req, res) => {
      try {
         const { name, email, password } = req.body

         if (!name || !email || !password) return res.status(BAD_REQUEST).json({message: 'falta name|email|passowrd'})

         let userRef = await User.findOne({ email })

         if (userRef) {
            return res.status(BAD_REQUEST).json({
               message: 'El correo ya existe'
            })
         }

         let encryptedPassword = encryptPassword(password)

         let user = await User.create({
            name,
            email,
            password: encryptedPassword
         })

         return res.status(CREATED).json({
            message: 'User created successfully',
            data: user
         })
      } catch (error) {
         console.log(error)
         return res.status(INTERNAL_SERVER_ERROR).json({
            message: 'Catch error at create user'
         })
      }
   }
]
