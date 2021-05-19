'use strict'

const setUser = require('../../auth/set-user')

module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const accountValidator = require('../accounts/account-validator')
  const userValidator = require('../users/user-validator')

  // TODO: Make this global in application
  router.param('accountId', accountValidator)
  router.param('userId', userValidator)

  router.post('/accounts/:accountId/users', authHandler(), controller.createAccountUser)
  router.get('/accounts/:accountId/users', authHandler(), controller.getAccountUsers)
  router.get('/accounts/:accountId/users/:userId', authHandler(), controller.getAccountUser)
  router.put('/accounts/:accountId/users/:userId', authHandler(), controller.updateAccountUser)
  router.delete('/accounts/:accountId/users/:userId', authHandler(), controller.deleteAccountUser)

  router.get('/users', authHandler((res, req, next) => {
    setUser(req, { userName: 'test.user@acme.com', id: 'f405d0b1-9577-4f41-b6d6-6e4d88e68db7' })
    next()
  }), controller.getAllUsers)

  return router
}
