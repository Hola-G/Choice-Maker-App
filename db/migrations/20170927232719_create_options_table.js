
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('options', function (table) {
            table.increments('id');
            table.integer('poll_id').unsigned();
            table.string('option_name');
            table.string('option_desc');
            table.timestamps(true, true);
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('options')
    ])
};
