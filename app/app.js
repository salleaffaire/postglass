const express = require('express')
const expressOasGenerator = require('express-oas-generator')
const cors = require('cors')
const httpContext = require('express-http-context')

const logger = require('./logger').child({ component: 'app' })

const { Model } = require('objection')
const Account = require('./routes/accounts/account-model')
const UserModel = require('./routes/users/user-model')

const uuidv4 = require('uuid').v4
const requestIdAttribute = require('./config').request.idAttrubute
function decorateRequest (req, res, next) {
  const requestId = req.headers[requestIdAttribute] || uuidv4()
  httpContext.set('reqId', requestId)
  logger.info(`Request ID: ${requestId}`)
  next()
}

module.exports = ({ dbConnection, authHandler, errorHandler, defaultHandler }) => {
  const app = express()

  /* This is a preliminary implementation for api docs using openapiv2 and default spec
   * This could be enhanced later to use custom spec or upgraded to OAS3.
   * Docs are hosted at http://0.0.0.0:8080/api/v1/documentation/api-docs/
   */
  expressOasGenerator.handleResponses(app, { swaggerUiServePath: 'api/v1/documentation/api-docs' })

  Model.knex(dbConnection)

  app.use(express.json())
  app.use(httpContext.middleware)

  // Set unique request identifier for each request
  app.use([decorateRequest])
  app.use(cors())

  app.use('/api/v1/', require('./routes/accounts/router')({ model: Account, authHandler }))
  app.use('/api/v1/', require('./routes/users/router')({ model: UserModel, authHandler }))

  expressOasGenerator.handleRequests(app)

  app.use(defaultHandler)

  app.use(errorHandler)

  return app
}
