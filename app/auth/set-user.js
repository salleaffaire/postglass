const requestContext = require('express-http-context')

module.exports = (req, user) => {
  req.user = user
  requestContext.set('user', user)
}
