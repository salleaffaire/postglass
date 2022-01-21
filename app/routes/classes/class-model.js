'use strict'
const { Model } = require('objection')
const BaseModel = require('../../db/base-model')
const CrudRepositoryBuilder = require('../../db/crud-repo-builder')

class Class extends BaseModel(Model) {
  static get tableName () {
    return 'classes'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(Class),
  findAll: (opts) => {
    const query = Class.query().debug().where({ status: null })
    if (opts.accountsFilter) {
      query.whereIn('accountId', opts.accountsFilter)
    }
    return query
  },
  findByAccountId: (accountId, opts) => Class.query().debug().where({ accountId, status: null }),
  findByAccountIdObjectId: (accountId, id, opts) => Class.query().debug().findOne({ accountId, id, status: null })
}
