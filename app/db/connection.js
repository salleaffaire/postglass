'use strict'
const Knex = require('knex')
const config = require('../config')
const logFormatter = require('./log-formatter')
const { knexSnakeCaseMappers } = require('objection')

const knex = Knex({
  ...config.db,
  log: logFormatter,
  ...knexSnakeCaseMappers()
})

knex.connect = () => knex.migrate.latest()
module.exports = knex
