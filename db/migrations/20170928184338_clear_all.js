
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('polls'),
    knex.schema.dropTableIfExists('options'),
    knex.schema.dropTableIfExists('votes')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('polls', function (table) {
      table.increments('id');
      table.string('poll_title');
      table.string('email');
      table.timestamps(true, true);
  }),
    knex.schema.createTableIfNotExists('options', function (table) {
      table.increments('id');
      table.integer('poll_id').unsigned();
      table.string('option_name');
      table.string('option_desc');
      table.timestamps(true, true);
  }),
    knex.schema.createTableIfNotExists('votes', function (table) {
      table.increments('id');
      table.integer('option_id').unsigned();
      table.integer('score').unsigned();
      table.timestamps(true, true);
  })
  ])
};
