'use strict'

const getUserName = require('./context-helper').getUserName
// Helper function to create CRUD-like "interface"
// for ObjectionJS-based Model
module.exports = (Model) => ({
  model: Model,
  insert: (insertData) => Model.query().debug().insertAndFetch({ createdBy: getUserName(), ...insertData }),
  findById: (id) => Model.query().debug().findOne({ id, status: null }),
  findByName: (name) => Model.query().debug().findOne({ name, status: null }),
  updateById: (id, updateData) => Model.query().debug().patchAndFetchById(id, { updatedBy: getUserName(), ...updateData }),
  deleteById: (id) => Model.query().debug().patchAndFetchById(id, { updatedBy: getUserName(), status: 'DELETED' }),
  findAll: () => Model.query().debug().where({ status: null })
})
