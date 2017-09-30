
exports.up = function (knex, Promise) {
    return knex.schema.table('options', function (table) {
        table.string('option_url');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('options', function (table) {
        table.dropColumn('option_url');
    })
};
