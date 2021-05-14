'use strict'
const logger = require('../logger')

const logFormatter = {
  warn: (message) => logger.warn('DB:', { log: message }),
  error: (message) => logger.error('DB:', { log: message }),
  deprecate: (method, alternative) => logger.warn('DB (deprecation):', method, alternative),
  debug: (message) => logger.debug('DB: ', { log: message })
}

module.exports = logFormatter
