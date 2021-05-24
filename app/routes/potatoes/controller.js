'use strict'
const log = require('../../logger').child({ component: 'potato-controller' })
const uuidv4 = require('uuid').v4

const { getPagingParameters } = require('../utils/paging')
const { createdUpdatedAt } = require('../utils/createdUpdatedAt')

module.exports = (collection) => {
  const createPotato = async (req, res) => {
    log.info('createPotato', { ...req.params, ...req.body })

    const body = { ...req.body, _id: uuidv4(), ...createdUpdatedAt() }

    try {
      const insertedPotato = await collection.insertOne(body)

      res.status(201).json(insertedPotato)
    } catch (error) {
      log.error('Error occurred while creating potato ', error)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getPotatoes = async (req, res) => {
    log.info('getPotatoes', { ...req.params, ...req.body, ...req.query })

    const { page, limit } = getPagingParameters(req.query)

    try {
      const allPotatoes = await collection.find().skip(page * limit).limit(limit).toArray()

      res.status(200).json(allPotatoes)
    } catch (error) {
      log.error('Error occurred while reading all potatoes ', error)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getPotatoId = async (req, res) => {
    log.info('getPotatoId', { ...req.params, ...req.body })

    const { potatoId } = req.params

    // console.log({ potatoId })

    try {
      const thePotato = await collection.find({ _id: potatoId }).toArray()
      console.log(thePotato)
      console.log(thePotato.length)

      if (thePotato.length !== 0) {
        res.status(200).json(thePotato)
      } else {
        res.status(404).json({ error: 'Potato not found' })
      }
    } catch (error) {
      log.error('Error occurred while reading all potatoes ', error)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  return {
    createPotato,
    getPotatoes,
    getPotatoId
  }
}
