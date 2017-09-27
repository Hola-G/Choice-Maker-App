
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('votes', function (table) {
            table.increments('id');
            table.integer('option_id').unsigned();
            table.integer('score').unsigned();
            table.timestamps(true, true);
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('votes')
    ])
};
