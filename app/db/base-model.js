'use strict'
const { compose } = require('objection')
const Guid = require('objection-guid')()
const TimeStamp = require('./objection-timestamp')

// Build base Model class with auto-populating id field (UUID)
// and createdAt/updatedAt timestamps
// TODO: Worth considering adding 'objection-soft-delete' plugin too
module.exports = compose(Guid, TimeStamp)
