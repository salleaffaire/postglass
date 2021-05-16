const chai = require('chai')
const supertest = require('supertest')
const App = require('../../app/app')
const appOptions = require('./mock-app-options')()
const faker = require('faker')

describe('Account Management API', () => {
  const app = App(appOptions)
  const agent = supertest.agent(app)
  const testDbConnection = appOptions.dbConnection

  before(async () => {
    await testDbConnection.migrate.latest()
  })

  after(async () => {
    await testDbConnection.migrate.rollback(null, true)
  })

  beforeEach(async () => {
    await testDbConnection.seed.run({ directory: './test/integration/seeds', specific: 'accounts.test.seed.js' })
    await testDbConnection.seed.run({ directory: './test/integration/seeds', specific: 'users.test.seed.js' })
  })

  describe('GET', () => {
    it('Must respond with an account if account exists', (done) => {
      agent.get('/api/v1/accounts/3558d153-8f60-4555-b188-880e287deee8')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('Must respond with 404 if account does not exist', (done) => {
      agent.get('/api/v1/accounts/a22bdf60-e44a-4237-b3e8-0d37aa4a3b0e')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => chai.expect(res.body.error).to.be.equal('No data found for account id a22bdf60-e44a-4237-b3e8-0d37aa4a3b0e'))
        .end(done)
    })

    it('Must return 404 if account is a deleted account', (done) => {
      agent.get('/api/v1/accounts/eaf493ca-0edb-4508-99df-e1385a3de26c')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => chai.expect(res.body.error).to.be.equal('No data found for account id eaf493ca-0edb-4508-99df-e1385a3de26c'))
        .end(done)
    })

    it('Must respond with 404 if account is inactive', (done) => {
      agent.get('/api/v1/accounts/c5c8a70e-2834-4ca5-bfa4-0a95f8e25219')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => chai.expect(res.body.error).to.be.equal('No active account found'))
        .end(done)
    })
  })

  describe('POST', () => {
    it('Must return the account that was created', (done) => {
      const payload = {
        name: faker.company.companyName(),
        active: true
      }
      console.log({ payload })
      agent.post('/api/v1/accounts')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(({ body }) => chai.expect(body).to.include({
          name: payload.name
        }))
        .end(done)
    })

    it('Must return an error if data was invalid', (done) => {
      const payload = {
        name: 50
      }
      agent.post('/api/v1/accounts')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => chai.expect(res.body.error).to.be.equal('"name" must be a string'))
        .end(done)
    })

    it('Must return an error if account name is too long', (done) => {
      const payload = {
        name: 'FYEnLCJqLIDrj2i4n2Iy1pXf4WAKkg0i9Qk6fiRTIPzhwd5kK5SDhypCSvxuY7BKD'
      }
      agent.post('/api/v1/accounts')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => chai.expect(res.body.error).to.be.equal('"name" length must be less than or equal to 64 characters long'))
        .end(done)
    })

    it('Must return 409 if account name is duplicate', (done) => {
      const payload = {
        name: 'BobAccount'
      }
      agent.post('/api/v1/accounts')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .end(done)
    })
  })
})
