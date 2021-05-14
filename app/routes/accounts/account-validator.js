'use strict'
const AccountModel = require('./account-model')
const log = require('../../logger').child({ component: 'account-validator' })
const Joi = require('@hapi/joi')

/* TODO:
  This is simple validator for :accountId parameter of API requests
  Later we might need to enhance/replace it with permission checking
  and make it application-global
  */
module.exports = async (req, res, next, accountId) => {
  const { error } = Joi.string().uuid().validate(accountId)

  if (error) {
    return res.status(422).json({ error: `Invalid UUID: ${accountId}` })
  }

  try {
    const account = await AccountModel.findById(accountId)
    if (!account) {
      log.warn('No account found with ID ', accountId)
      return res.status(404).json({ error: `No data found for account id ${accountId}` })
    }
    next()
  } catch (err) {
    log.error('Error while validating account id: ', err)
    res.sendStatus(500).json({ error: 'Unknown error' })
  }
}
