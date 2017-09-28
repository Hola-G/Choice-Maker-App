
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('polls', function (table) {
      table.increments('id');
      table.string('poll_title');
      table.string('email');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('options', function (table) {
      table.increments('id');
      table.integer('poll_id').unsigned();
      table.foreign('poll_id').references('polls.id');
      table.string('option_name');
      table.string('option_desc');
      table.timestamps(true, true);
  }),
    knex.schema.createTable('votes', function (table) {
      table.increments('id');
      table.integer('option_id').unsigned();
      table.foreign('option_id').references('options.id');
      table.integer('score').unsigned();
      table.timestamps(true, true);
    })
])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('options'),
    knex.schema.dropTable('votes')
  ])
};
