/* eslint-disable no-unused-expressions */
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const faker = require('faker')
const proxyquire = require('proxyquire')
const config = {
  logger: {
    label: process.env.LABEL || 'microservice-template',
    logging: {
      level: process.env.LOG_LEVEL || 'debug', // debug, verbose, info, warn, error
      format: process.env.LOG_FORMAT || 'json' // text , json
    }
  }
}

const AccountModel = require('../../../app/routes/accounts/account-model')
chai.use(sinonChai)
const expect = chai.expect

describe('Accounts Controller', () => {
  let controller = null
  let MockAccountModel = null

  const responseStub = {}

  beforeEach(() => {
    MockAccountModel = sinon.stub(AccountModel)
    // controller = require('../../../app/routes/accounts/controller')(MockAccountModel)
    controller = proxyquire('../../../app/routes/accounts/controller', { '../../config.js': config })(MockAccountModel)
    responseStub.status = sinon.stub().returns(responseStub)
    responseStub.json = sinon.stub().returns(responseStub)
  })

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })

  describe('getAccount', () => {
    it('Returns account', async () => {
      const testAccount = { name: 'Bob', active: true, id: '3558d153-8f60-4555-b188-880e287deee8' }
      MockAccountModel.findById.resolves(testAccount)
      await controller.getAccount(
        { params: { accountId: testAccount.id } },
        responseStub,
        null
      )

      expect(MockAccountModel.findById).to.have.been.calledOnceWith(testAccount.id)
      expect(responseStub.json).to.have.been.calledOnceWith(testAccount)
        .and.calledAfter(MockAccountModel.findById)
    })

    it('Returns 404 if account is inactive', async () => {
      const testAccount = { name: 'Bob', active: false, id: '3558d153-8f60-4555-b188-880e287deee8' }
      MockAccountModel.findById.resolves(testAccount)
      await controller.getAccount(
        { params: { accountId: testAccount.id } },
        responseStub,
        null
      )

      expect(MockAccountModel.findById).to.have.been.calledOnceWith(testAccount.id)
      expect(responseStub.status).to.have.been.calledOnceWith(404)
      expect(responseStub.json).to.have.been.calledOnceWith(sinon.match.has('error'))
        .and.calledAfter(MockAccountModel.findById)
    })

    it('Sets response code to 500 in case of an exception')
  })

  describe('createAccount', () => {
    it('Creates account and set response code to 201', async () => {
      const req = { body: { name: 'Bob', active: false }, user: { accountId: faker.random.uuid() } }
      const id = '3558d153-8f60-4555-b188-880e287deee8'

      MockAccountModel.insert.resolves({ _id: id, ...req.body })
      MockAccountModel.findByName.resolves()

      await controller.createAccount(req, responseStub, () => {})

      expect(MockAccountModel.findByName).to.have.been.calledOnceWith(req.body.name)
      expect(responseStub.status).to.have.been.calledOnceWith(201)
      expect(responseStub.json).to.have.been.calledOnceWith(
        sinon.match({ _id: id, ...req.body })
      )
      expect(MockAccountModel.insert).to.have.been.calledOnceWith({ ...req.body })
    })

    it('Returns 409 for existing account name', async () => {
      const testAccount = { name: 'Bob', active: true, id: '3558d153-8f60-4555-b188-880e287deee8' }
      const req = { body: { name: 'Bob', active: false }, user: { accountId: faker.random.uuid() } }

      MockAccountModel.findByName.resolves(testAccount)

      await controller.createAccount(req, responseStub, () => {})

      expect(MockAccountModel.findByName).to.have.been.calledOnceWith(req.body.name)
      expect(responseStub.status).to.have.been.calledOnceWith(409)
      expect(MockAccountModel.insert).to.have.not.been.called
    })
  })
})
