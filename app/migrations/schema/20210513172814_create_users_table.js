
exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.uuid('id').primary()
      table.string('user_name').notNullable()
      table.string('full_name')
      table.boolean('active').defaultTo(true)
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false })
      table.string('created_by')
      table.string('updated_by')
      table.string('status')
      table.uuid('account_id')
      table.foreign('account_id').references('accounts.id')
      table.index('account_id')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
}
