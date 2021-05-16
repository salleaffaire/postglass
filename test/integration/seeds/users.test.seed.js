/*
 * Use 1/0 to in 'active' field - SQLite (test DB driver) does not have
 * true booleans, and PostgreSQL (our actual driver) can translate 1/0 into
 * proper boolean
 */
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries for test
      return knex('users').insert([
        { id: 'f2ca7289-7067-4666-aa22-6d0eb187b75b', userName: 'test.user1_acc1@acme.com', active: 1, accountId: '3558d153-8f60-4555-b188-880e287deee8' },
        { id: '8a6e0bca-8123-4c3d-b33f-b6272bf585ac', userName: 'test.user2_acc1@acme.com', active: 1, accountId: '3558d153-8f60-4555-b188-880e287deee8' },
        { id: '1c428c88-dfed-41bb-b5e0-bdc806973256', userName: 'test.user3_acc1@acme.com', active: 0, accountId: '3558d153-8f60-4555-b188-880e287deee8' },
        { id: 'c5c8a70e-2834-4ca5-bfa4-0a95f8e25219', userName: 'test.user4_acc1@acme.com', active: 0, accountId: '3558d153-8f60-4555-b188-880e287deee8' },
        { id: '83d6d00c-2eeb-4221-b47c-266faea6af61', userName: 'update.user1_acc1@acme.com', active: 0, accountId: '3558d153-8f60-4555-b188-880e287deee8' },
        { id: 'ae92b6e6-32ef-454e-8a82-fbebb3214286', userName: 'test.user1_acc2@acme.com', active: 1, accountId: '3558d153-8f60-4555-b188-880e287deee9' },
        // * Inactive user with the same name as in account 1
        { id: '43f528a4-d7fa-4617-87ce-b2d2d1befe60', userName: 'test.user1_acc1@acme.com', active: 0, accountId: '3558d153-8f60-4555-b188-880e287deee9' },
        { id: 'eaf493ca-0edb-4508-99df-e1385a3de26c', userName: 'test.user5_acc1@acme.com', active: 1, accountId: '3558d153-8f60-4555-b188-880e287deee9', status: 'DELETED' },
        { id: '9da85f0d-4ee8-4f46-9d3a-48949062a752', userName: 'test.user1_acc1@acme.com', active: 1, accountId: '3558d153-8f60-4555-b188-880e287deeea' }
      ])
    })
}
