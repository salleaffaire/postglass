const config = require('../migration-config')

const mainObjects = [
  { id: '4f42931d-344a-4ffe-93a8-c0f12eaa267b', className: 'baseClass', name: 'base1', str_1: 'foobar' }
]

const secondaryObjects = [
  { id: '13232261-f326-43dd-8598-2da593119dca', className: 'secondBaseClass', name: 'second1', str_1: 'quebec', str_2: 'quebec' },
  { id: 'c86c6747-1a79-47b5-8867-b692d5c3c7ee', className: 'secondBaseClass', name: 'second2', str_1: 'montreal', str_2: 'quebec' },
  { id: '9a833577-b7ec-4bff-bb9b-ebb5a92d8472', className: 'secondBaseClass', name: 'second3', str_1: 'ottawa', str_2: 'ontario' }
]

exports.up = function (knex) {
  const classListMain = mainObjects.map(object => ({ ...object, accountId: config.MainAccountId, createdBy: config.knexUserId }))
  const classListSecondary = secondaryObjects.map(object => ({ ...object, accountId: config.SecondaryAccount, createdBy: config.knexUserId }))

  const insertMain = knex('objects').insert(classListMain)
  const insertSecondary = knex('objects').insert(classListSecondary)

  return insertMain
    .then(() => insertSecondary)
}

exports.down = function (knex) {
  const ids = mainObjects.map(user => user.id)
  return knex('objects').whereIn('id', ids).delete()
}
