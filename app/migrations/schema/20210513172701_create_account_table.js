
exports.up = function (knex) {
  return knex.schema
    .createTable('accounts', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.boolean('active').defaultTo(true)
      table.string('status')
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.string('created_by')
      table.string('updated_by')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('accounts')
}
