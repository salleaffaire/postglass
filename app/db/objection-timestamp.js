'use strict'
/* Plugin class for ObjectionJS to auto populate
  created_at field when new object is being stored in DB
  and updated_at when object is saved after update

  */
module.exports = (Model) => class extends Model {
  $beforeInsert (context) {
    const parent = super.$beforeInsert(context)
    return Promise.resolve(parent).then(() => { this.createdAt = new Date().toISOString() })
  }

  $beforeUpdate (context) {
    const parent = super.$beforeUpdate(context)
    return Promise.resolve(parent).then(() => { this.updatedAt = new Date().toISOString() })
  }
}
