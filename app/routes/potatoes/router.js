'use strict'

const Joi = require('@hapi/joi')

module.exports = ({ mongoClient, authHandler }) => {
  console.log({ mongoClient })
  const router = require('express').Router()
  const controller = require('./controller')(mongoClient)

  // TODO: Make this global in application
  router.param('potatoId', async (req, res, next, potatoId) => {
    const { error } = Joi.string().uuid().validate(potatoId)

    if (error) {
      return res.status(422).json({ error: `Invalid UUID: ${potatoId}` })
    }
    next()
  })

  router.post('/potatoes', authHandler(), controller.createPotato)
  router.get('/potatoes', authHandler(), controller.getPotatoes)
  router.get('/potatoes/:potatoId', authHandler(), controller.getPotatoId)

  return router
}
