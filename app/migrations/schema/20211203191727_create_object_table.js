
exports.up = function (knex) {
  return knex.schema.createTable('objects', (table) => {
    table.uuid('id').primary()
    table.string('class_name')
    table.foreign('class_name').references('classes.name')
    table.index('class_name')
    table.string('name')
    table.unique(['class_name', 'name'])
    table.string('str_1')
    table.string('str_2')
    table.string('str_3')
    table.string('str_4')
    table.string('str_5')
    table.string('str_6')
    table.string('str_7')
    table.string('str_8')
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
  return knex.schema.dropTableIfExists('users')
}
