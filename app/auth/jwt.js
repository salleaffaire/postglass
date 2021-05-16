const authConfig = require('../config').auth
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// https://www.npmjs.com/package/express-jwt
// https://github.com/auth0/node-jwks-rsa/tree/034a5b552b98f65247a00297c0c50e5468a3dbee/examples/express-demo

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
