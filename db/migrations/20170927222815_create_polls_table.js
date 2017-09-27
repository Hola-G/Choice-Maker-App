
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.createTable('polls', function (table) {
            table.increments('id');
            table.string('poll_title');
            table.string('email');
            table.timestamps(true, true);
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('polls'),
        knex.schema.createTable('users', function (table) {
            table.increments();
            table.string('name');
        })
    ])
};
