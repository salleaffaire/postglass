const config = require('../migration-config')

const mainClasses = [
  { id: 'ef9b4430-fc33-4564-bd5c-c7a7b4a019bf', name: 'baseClass', str_1: 'position' }
]

const secondaryClasses = [
  { id: 'c9a92228-5eff-4a32-be4e-ccddf2cc4e6e', name: 'secondBaseClass', str_1: 'city', str_2: 'state' }
]

exports.up = function (knex) {
  const mainClassList = mainClasses.map(_class => ({ ..._class, accountId: config.MainAccountId, createdBy: config.knexUserId }))
  const secondaryClassList = secondaryClasses.map(_class => ({ ..._class, accountId: config.SecondaryAccount, createdBy: config.knexUserId }))

  const insertMainClasses = knex('classes').insert(mainClassList)
  const insertSecondaryClasses = knex('classes').insert(secondaryClassList)

  return insertMainClasses
    .then(() => insertSecondaryClasses)
}

exports.down = function (knex) {
  const ids = mainClasses.map(user => user.id)
  return knex('classes').whereIn('id', ids).delete()
}
