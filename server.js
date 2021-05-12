import dotenv from 'dotenv'
dotenv.config()
const app = require('./config/app')
const config = require('./config').defaultConfig
const server = app()
server.create(config)
server.start()
