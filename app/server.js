const config = require('./config')
const logger = require('./logger')
const dbConnection = require('./db/connection')
const auth = require('./auth')

const startup = async () => {
  logger.info('Server starting')

  try {
    await dbConnection.connect()
  } catch (error) {
    logger.error('Unable to connect to DB: ', error)
    process.exit(11)
  }

  const app = require('./app')({
    dbConnection: dbConnection,
    authHandler: auth.requestHandler
  })

  // Default route for requests not matched above
  app.use(function (req, res) {
    res.status(404).json({ error: 'Invalid route' })
  })

  app.use(auth.errorHandler)

  app.listen(config.express.port, config.express.ip)
    .on('error', (error) => {
      logger.error(`Unable to start server (${error.message})`)
      process.exit(12)
    })
    .on('listening', () => {
      logger.info('Server is listening on http://' + config.express.ip + ':' + config.express.port)
      logger.info('Refer http://' + config.express.ip + ':' + config.express.port + '/api/v1/documentation/api-docs/ for API documentation.')
    })
}

startup()
