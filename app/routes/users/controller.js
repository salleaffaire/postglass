'use strict'
const _ = require('lodash')
const log = require('../../logger').child({ component: 'users-controller' })
const createAccountUserSchema = require('../utils/validation').createAccountUserSchema
const updateAccountUserSchema = require('../utils/validation').updateAccountUserSchema
const validator = require('../utils/validation').validate

module.exports = (UserModel) => {
  const createAccountUser = async (req, res) => {
    log.info('createAccountUser', { ...req.params, ...req.body })
    const result = validator(createAccountUserSchema, req.body)

    if (result) {
      log.error(`Invalid input: ${result}`)
      return res.status(422).json({ error: result })
    }
    try {
      const { fullName, active } = req.body
      const { accountId } = req.params
      const userName = _.trim(req.body.userName).toLowerCase()

      let user = await UserModel.findByUserName(userName)
      if (user) {
        log.error('User already exists:', user)
        return res.status(409).json({ error: `User ${user.userName} already exists` })
      }

      user = await UserModel.insert({
        accountId,
        userName,
        fullName,
        active
      })

      res.status(201).json(user)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getAccountUsers = async (req, res) => {
    log.info('getAccountUsers', { ...req.params, ...req.body })
    const { accountId } = req.params
    try {
      const userList = await UserModel.findByAccountId(accountId, { include: _.get(req, 'query.extravalues', []) })
      res.json(userList)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  /*
   * Make sure to always use {accountId, userId } when looking for a
   * particular user = so that after we finally have permission checking,
   * malicious/curious user from account A cannot update user from account B
   * using known user's ID
   */
  const updateAccountUser = async (req, res) => {
    log.info('updateAccountUser', { ...req.params, ...req.body })

    const result = validator(updateAccountUserSchema, req.body)

    if (result) {
      log.error(`Invalid input: ${result}`)
      return res.status(422).json({ error: result })
    }
    try {
      const { accountId, userId } = req.params

      let user = await UserModel.findByAccountIdUserId(accountId, userId)
      if (!user) {
        log.warn('User not found')
        return res.sendStatus(404)
      }

      const { active } = req.body
      if (active !== user.active) {
        if (active) {
          /*
           * Make sure there a no other active users with the same userName
           */
          const otherUser = await UserModel.findByUserName(user.userName)
          if (otherUser) {
            log.error('Attempt to activate a user while active record already exists:', otherUser)
            return res.sendStatus(409)
          }
        }

        user = await UserModel.updateByAccountIdUserId(accountId, userId, { active })
      }
      res.json(user)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getAccountUser = async (req, res) => {
    log.info('getAccountUser', { ...req.params, ...req.body })
    const { accountId, userId } = req.params
    try {
      const user = await UserModel.findByAccountIdUserId(accountId, userId, { include: _.get(req, 'query.extravalues', []) })
      if (!user || !user.active) {
        log.warn('User doesnot exist or is inactive')
        return res.status(404).json({ error: 'User doesnot exist or is inactive' })
      }
      res.json(user)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getAllUsers = async (req, res) => {
    log.info('getAllUsers', { ...req.params, ...req.body, filerByAccounts: req.accountsFilter })
    try {
      const userList = await UserModel.findAll({
        accountsFilter: req.accountsFilter,
        include: _.get(req, 'query.extravalues', [])
      })

      res.json(userList)
    } catch (err) {
      log.error('Error: ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const deleteAccountUser = async (req, res) => {
    log.info('deleteAccountUser', req.params)
    const { accountId, userId } = req.params

    try {
      const updatedUser = await UserModel.updateByAccountIdUserId(accountId, userId, { status: 'DELETED' })
      res.status(200).json(updatedUser)
    } catch (err) {
      log.error(`Error occurred while deleting user ${err}`)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  return {
    createAccountUser,
    getAccountUsers,
    getAccountUser,
    updateAccountUser,
    getAllUsers,
    deleteAccountUser
  }
}
