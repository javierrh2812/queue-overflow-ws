const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT || 3001
const hostname = process.env.HOSTNAME || 'LOCALHOST'
const db_url = process.env.DB_URL
const db_name = process.env.DB_NAME

export const defaultConfig = {
   env,
   port,
   hostname,
   db_url,
   db_name
}

export const jwtConfig = {
   token: {
      secretKey: 'thisIsATokenSecretKey',
      expiresIn: '30m'
   },
   refreshToken: {
      secretKey: 'thisIsARefreshSecretKey',
      expiresIn: '7d'
   }
}

export const bcryptConfig = {
   saltRounds: 10
}
