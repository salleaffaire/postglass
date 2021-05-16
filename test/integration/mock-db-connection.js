'use strict'

const Knex = require('knex')
const { knexSnakeCaseMappers } = require('objection')

const dbDriver = process.env.TEST_DB_DRIVER || 'sqlite3'

const connections = {
  sqlite3: {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    migrations: {
      directory: './app/migrations/schema'
    },
    useNullAsDefault: true,
    log: require('../../app/db/log-formatter'),
    ...knexSnakeCaseMappers(),
    pool: { min: 0, max: 1 }
  },
  pg: {
    client: 'pg',
    connection: {
      port: process.env.DB_PORT || 5432,
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DB || 'postgres',
      timezone: 'UTC'
    },
    migrations: {
      directory: './app/migrations/schema'
    },
    pool: {
      min: 0,
      max: 1
    },
    ...knexSnakeCaseMappers()
  }
}

const testDbConnection = Knex(connections[dbDriver])

module.exports = testDbConnection
