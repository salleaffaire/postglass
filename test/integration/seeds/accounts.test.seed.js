exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(() => {
      // Inserts seed entries for test
      return knex('accounts').insert([
        { id: '3558d153-8f60-4555-b188-880e287deee8', name: 'BobAccount', active: 1 },
        {
          id: '3558d153-8f60-4555-b188-880e287deee9',
          name: 'This account will be updated',
          active: 1,
          createdBy: 'test.user4_acc1@acme.com'
        },
        { id: '3558d153-8f60-4555-b188-880e287deeea', name: 'This account will be deleted', active: 1 },
        { id: 'c5c8a70e-2834-4ca5-bfa4-0a95f8e25219', name: 'Inactive account', active: 0 },
        { id: 'eaf493ca-0edb-4508-99df-e1385a3de26c', name: 'This account doesnt exist', active: 1, status: 'DELETED' }
      ])
    })
}
