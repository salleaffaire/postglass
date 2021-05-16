const testDbConnection = require('./mock-db-connection')
const jwt = require('express-jwt')
const errorHandler = require('../../app/auth').errorHandler
const defaultHandler = require('../../app/default').handler

module.exports = (mockOptions = {}) => {
  const permissiveAuth = (req, res, next) => {
    req.token = { name: 'Bob' }
    req.user = { userName: 'Bob@account.com', accountId: '4f8fd2c0-9804-459b-a2bf-5c2d2b35a3e9' }
    next()
  }

  const rejectAllAuth = (req, res, next) => {
    next(new jwt.UnauthorizedError('invalid_token', { message: 'Thou shall not pass' }))
  }

  const mockJwtMiddleware = (req, res, next) => {
    const email = mockOptions.getEmail ? mockOptions.getEmail() : 'Bob@account.com'
    req.token = {
      email
    }
    next()
  }

  const mockJwtAuth = (options) => {
    return [mockJwtMiddleware]
  }

  const auth = {
    permissive: (options) => permissiveAuth,
    reject: (options) => rejectAllAuth,
    mockJwt: (options) => mockJwtAuth(options)
  }

  return {
    dbConnection: testDbConnection,
    authHandler: (options) => {
      const authType = mockOptions.auth || 'permissive'
      return auth[authType](options) || auth.permissive(options)
    },
    errorHandler: errorHandler,
    defaultHandler: defaultHandler
  }
}
