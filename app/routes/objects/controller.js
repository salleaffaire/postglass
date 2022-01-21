'use strict'
const _ = require('lodash')
const log = require('../../logger').child({ component: 'objects-controller' })

module.exports = (ObjectModel) => {
  const getAllObjects = async (req, res) => {
    log.info('getAllObjects', { ...req.params, ...req.body, filerByAccounts: req.accountsFilter })
    try {
      const objectList = await ObjectModel.findAll({
        accountsFilter: req.accountsFilter,
        include: _.get(req, 'query.extravalues', [])
      })

      res.json(objectList)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  return {
    getAllObjects
  }
}
