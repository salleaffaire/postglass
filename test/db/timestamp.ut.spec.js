/* eslint-disable no-unused-expressions */
'use strict'
const chai = require('chai')
chai.use(require('chai-iso8601')())

const expect = chai.expect
const TimeStamp = require('../../../app/db/objection-timestamp')
const Model = require('objection').Model
class TestModel extends TimeStamp(Model) { }

/* These tests use etime margin "within 1 second of" instead of
  stubbing/comparing the actual value
  */
describe('TimeStamp model plugin', () => {
  it('Should add createdAt property to during insertion', async () => {
    const testModel = new TestModel()

    await testModel.$beforeInsert()

    expect(testModel.createdAt).to.be.iso8601(new Date(), 1000)
    expect(testModel.updatedAt).to.be.undefined
  })

  it('Should add updatedAt property to during update', async () => {
    const testModel = new TestModel()

    await testModel.$beforeUpdate()
    expect(testModel.updatedAt).to.be.iso8601(new Date(), 1000)
    expect(testModel.createdAt).to.be.undefined
  })
})
