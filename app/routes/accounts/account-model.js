const { Model } = require('objection')
const BaseModel = require('../../db/base-model')
const CrudRepositoryBuilder = require('../../db/crud-repo-builder')

class Account extends BaseModel(Model) {
  static get tableName () {
    return 'accounts'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(Account),
  findAll: (accountsFilter) => {
    const query = Account.query().debug().where('status', null)
    if (accountsFilter) {
      query.whereIn('id', accountsFilter)
    }
    return query
  },
  findCreatedByAccount: (accountId) => Account.query().debug().where('status', null).where('parentAccountId', accountId),
  findCreatedByUser: ({ userName }) => Account.query().debug().where('status', null).where('createdBy', userName),
  findByIds: (accountIdList) => Account.query().debug().where('status', null).whereIn('id', accountIdList)
}
