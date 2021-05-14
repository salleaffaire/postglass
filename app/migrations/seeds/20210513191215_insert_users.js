const config = require('../migration-config')

const mainAdmins = [
  { id: 'a63dfa8d-3bfa-48e2-be2b-b69cb0650e9f', userName: 'luc.martel@acme.com' }
]

exports.up = function (knex) {
  const userList = mainAdmins.map(user => ({ ...user, accountId: config.MainAccountId, createdBy: config.knexUserId }))

  return knex('users').insert(userList)
}

exports.down = function (knex) {
  const ids = mainAdmins.map(user => user.id)
  return knex('users').whereIn('id', ids).delete()
}
