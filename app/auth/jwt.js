const authConfig = require('../config').auth
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.issuer}/.well-known/jwks.json`
  }),
  userProperty: 'token',
  audience: authConfig.audience,
  issuer: `https://${authConfig.issuer}/`,
  algorithms: ['RS256']
})

module.exports = checkJwt
