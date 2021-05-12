import routes from '../api'

export default function initRoutes(server) {
   server.get('*', function (req, _, next) {
      console.log('Request was made to: ' + req.originalUrl)
      return next()
   })
   server.use('/api', routes)
}
