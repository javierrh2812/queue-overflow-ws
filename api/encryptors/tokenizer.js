import { sign, verify, decode } from 'jsonwebtoken'
import { jwtConfig } from '../../config'

const tokenOptions = { expiresIn: jwtConfig.token.expiresIn }

export const createToken = (data) => sign(data, jwtConfig.token.secretKey, tokenOptions)

export const verifyToken = (token) => verify(token, jwtConfig.token.secretKey)

export const decodeToken = (token) => decode(token)
