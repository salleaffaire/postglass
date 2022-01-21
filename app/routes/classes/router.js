'use strict'

module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  // const accountValidator = require('../accounts/account-validator')

  // TODO: Make this global in application
  // router.param('accountId', accountValidator)

  router.get('/classes', authHandler(), controller.getAllClasses)

  return router
}
