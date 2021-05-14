
const config = require('./config')

const { createLogger, format, transports } = require('winston')

const formatRest = (info) => {
  const logString = JSON.stringify(Object.assign({}, info, {
    level: undefined,
    message: undefined,
    timestamp: undefined,
    label: undefined,
    component: undefined
  }))
  // Don't return empty objects
  return logString === '{}' ? '' : logString
}
const logger = createLogger({
  format: format.combine(
    format.label({ label: config.logger.label }),
    format.timestamp(),
    format.printf((info) => {
      const { timestamp, label, level, component } = info
      const componentStr = component ? ` (${component})` : ''
      return `${timestamp} | ${label}${componentStr} | ${level} | ${info.message} ${formatRest(info)}`
    })
  ),
  level: config.logger.logging.level
})

if (process.env.NODE_ENV !== 'test') {
  logger.add(new transports.Console({}))
} else {
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }))
}

module.exports = logger
