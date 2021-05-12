import express from 'express'
import mongoose from '../api/models/mongoose'
import cors from 'cors'
import initRoutes from './routes'

module.exports = function () {
   const server = express()

   const create = (config) => {
      console.log('config', config)
      const { env, port, hostname, db_url, db_name } = config
      // set all the server things
      server.set('env', env)
      server.set('port', port)
      server.set('hostname', hostname)
      // add cors options
      server.use('*', cors())
      // add middleware to parse the json
      server.use(express.json())
      server.use(
         express.urlencoded({
            extended: false
         })
      )
      mongoose.connect(`${db_url}/${db_name}`)
      initRoutes(server)
      //ga
   }

   const start = () => {
      let hostname = server.get('hostname')
      let port = server.get('port')

      server.listen(port, () =>
         console.log(`Server running on http://${hostname}:${port}`)
      )
   }

   return { create, start }
}
