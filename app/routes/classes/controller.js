'use strict'
const _ = require('lodash')
const logger = require('../../logger').child({ component: 'classes-controller' })

module.exports = (ClassModel) => {
  const getAllClasses = async (req, res) => {
    logger.info('getAllClasses', { ...req.params, ...req.body, filerByAccounts: req.accountsFilter })
    try {
      const objectList = await ClassModel.findAll({
        accountsFilter: req.accountsFilter,
        include: _.get(req, 'query.extravalues', [])
      })

      res.json(objectList)
    } catch (err) {
      logger.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getClassByName = async (req, res, next) => {
    logger.info('Received get request for account ', req.params)
    const { accountId, className, accountFilter } = req.params

    if (!(accountId in accountFilter)) {
      return res.status(403).json({ error: `Access denied in account: ${accountId}` })
    }

    try {
      const account = await ClassModel.findByName(accountId, className)
      if (account.active) {
        return res.status(200).json(account)
      } else {
        return res.status(404).json({ error: 'No active account found' })
      }
    } catch (err) {
      logger.error('Error occurred while getting account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  return {
    getAllClasses,
    getClassByName
  }
}
