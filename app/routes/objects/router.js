'use strict'

module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  // const accountValidator = require('../accounts/account-validator')

  // TODO: Make this global in application
  // router.param('accountId', accountValidator)

  // router.get('/objects/:objectId', authHandler(), controller.getAllObjects)
  router.get('/objects', authHandler(), controller.getAllObjects)
  // router.get('/objects', authHandler(), controller.getAllObjects)

  return router
}
