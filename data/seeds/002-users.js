
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {username: 'tom'},
    {username: 'bill'},
    {username: 'jim'},
  ]);
};
