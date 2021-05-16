const appOptions = require('./mock-app-options')()

describe('Application DB migration scripts', function () {
  const testDbConnection = appOptions.dbConnection
  const migrationConfig = {
    directory: ['./app/migrations/schema', './app/migrations/seeds/'],
    sortDirsSeparately: true
  }

  it('Performs all migrations', async function () {
    await testDbConnection.migrate.latest(migrationConfig)
  })

  it('Rolls back all migrations', async function () {
    await testDbConnection.migrate.rollback(migrationConfig, true)

    this.test.ctx.skipDeletions = true
  })
})
