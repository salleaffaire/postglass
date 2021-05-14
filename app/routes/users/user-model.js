'use strict'
const { Model } = require('objection')
const BaseModel = require('../../db/base-model')
const CrudRepositoryBuilder = require('../../db/crud-repo-builder')
const getCurrentUserName = require('../../db/context-helper').getUserName

class User extends BaseModel(Model) {
  static get tableName () {
    return 'users'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(User),
  findAll: (opts) => {
    const query = User.query().debug().where({ status: null })
    if (opts.accountsFilter) {
      query.whereIn('accountId', opts.accountsFilter)
    }
    return query
  },
  findByAccountId: (accountId, opts) => User.query().debug().where({ accountId, status: null }),
  findByAccountIdUserId: (accountId, id, opts) => User.query().debug().findOne({ accountId, id, status: null }),
  findByUserName: (userName) => User.query().debug().findOne({ userName, active: 1, status: null }),
  updateByAccountIdUserId: async (accountId, id, updateData) => {
    const user = await User.query().debug().findOne({ accountId, id, status: null })
    if (!user) {
      return user
    }
    const updatedBy = getCurrentUserName()
    return user.$query().debug().patchAndFetch({ updatedBy, ...updateData })
  }
}
