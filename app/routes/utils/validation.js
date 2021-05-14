'use strict'

const Joi = require('@hapi/joi')
const log = require('../../logger')

const accountCreateSchema = Joi.object({
  name: Joi.string().required().max(64),
  active: Joi.boolean().strict(),
  parentAccountId: Joi.string().uuid({ version: 'uuidv4' })
}).required()

const createAccountUserSchema = Joi.object({
  userName: Joi.string().required().max(64),
  fullName: Joi.string().required()
})

const updateAccountUserSchema = Joi.object({
  active: Joi.boolean().strict().required()
})

const validate = function (schema, data) {
  const { error } = schema.validate(data)
  if (error) {
    const { details } = error
    const message = details.map(i => i.message).join(',')
    log.error('Input validation failed with error ', details)
    return message
  }
}

module.exports = {
  accountCreateSchema,
  createAccountUserSchema,
  updateAccountUserSchema,

  validate
}
