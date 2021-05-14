
module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const accountValidator = require('./account-validator')

  router.param('accountId', accountValidator)

  router.get('/accounts/:accountId', authHandler(), controller.getAccount)
  router.get('/accounts', authHandler(), controller.listAccounts)
  router.post('/accounts', authHandler(), controller.createAccount)

  return router
}
