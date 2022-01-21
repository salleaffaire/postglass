'use strict'
const { Model } = require('objection')
const BaseModel = require('../../db/base-model')
const CrudRepositoryBuilder = require('../../db/crud-repo-builder')

class Object extends BaseModel(Model) {
  static get tableName () {
    return 'objects'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(Object),
  findAll: (opts) => {
    const query = Object.query().debug().where({ status: null })
    if (opts.accountsFilter) {
      query.whereIn('accountId', opts.accountsFilter)
    }
    return query
  },
  findByAccountId: (accountId, opts) => Object.query().debug().where({ accountId, status: null }),
  findByAccountIdObjectId: (accountId, id, opts) => Object.query().debug().findOne({ accountId, id, status: null })
}
