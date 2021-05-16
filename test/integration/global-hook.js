const testDbConnection = require('./mock-db-connection')

/*
 * This is GLOBAL hook which is executed after ALL integration test cases
 */
after(async () => {
  console.log('GLOBAL HOOK AFTER ALL')
  await testDbConnection.migrate.rollback(null, true)
  await testDbConnection.destroy()
})

afterEach(async function () {
  console.log('GLOBAL HOOK AFTER EACH')
  if (!this.currentTest.ctx.skipDeletions) {
    await testDbConnection('users').delete()
    await testDbConnection('accounts').delete()
  }
})
