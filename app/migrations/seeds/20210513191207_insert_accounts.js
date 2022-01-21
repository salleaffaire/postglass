const config = require('../migration-config')

exports.up = function (knex) {
  return knex('accounts').insert([
    { id: config.MainAccountId, name: 'Main Account', createdBy: config.knexUserId },
    { id: config.SecondaryAccount, name: 'Secondary Account', createdBy: config.knexUserId }
  ])
}

exports.down = function (knex) {
  return knex('accounts').where('id', config.MainAccountId).delete()
}
