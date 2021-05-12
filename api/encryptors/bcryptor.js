import {hashSync, compareSync} from 'bcrypt'
import {bcryptConfig} from '../../config'

const saltRounds = bcryptConfig.saltRounds

export const encryptPassword = (string) =>  hashSync(string, saltRounds)
export const checkPassword = (plainText, hash) => compareSync(plainText, hash)


