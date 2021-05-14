const { UnauthorizedError } = require('express-jwt')
const logger = require('../logger').child({ component: 'auth-error-handler' })

const authenticationErrorHandler = (err, req, res, next) => {
  logger.warn('Error: ', err)

  if (err instanceof UnauthorizedError) {
    res.status(err.status).json({ code: err.code, error: err.message })
  } else if (err instanceof SyntaxError) {
    res.status(err.status).json({ code: err.code, error: `Syntax error in input json - ${err.message}` })
  } else if (err.status && err.message) {
    res.status(err.status).json({ error: err.message })
  } else {
    next(err)
  }
}

module.exports = authenticationErrorHandler
