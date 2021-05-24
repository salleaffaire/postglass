const config = require('./config')
const logger = require('./logger')
const dbConnection = require('./db/connection')
const { MongoClient } = require('mongodb')
const mongoClient = new MongoClient(config.mongo.uri)
const auth = require('./auth')
const defaulHandler = require('./default')

const startup = async () => {
  logger.info('Server starting')

  try {
    await dbConnection.connect()
    console.log('Connected successfully to the DB Server')
  } catch (error) {
    logger.error('Unable to connect to DB. Error: ', error)
    process.exit(11)
  }

  try {
    await mongoClient.connect()

    // Test connection
    await mongoClient.db('admin').command({ ping: 1 })
    console.log('Connected successfully to the MongoDB Server')
  } catch (error) {
    logger.error('Unable to connect to Mongo DB. Error: ', error)
    process.exit(11)
  }

  const app = require('./app')({
    dbConnection: dbConnection,
    mongoClient: mongoClient,
    authHandler: auth.requestHandler,
    errorHandler: auth.errorHandler,
    defaultHandler: defaulHandler.handler
  })

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
