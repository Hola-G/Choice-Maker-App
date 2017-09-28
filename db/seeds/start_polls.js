exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('options').insert({poll_id: 1, option_name: 'apple'}),
        knex('options').insert({poll_id: 1, option_name: 'banana'}),
        knex('options').insert({poll_id: 1, option_name: 'orange'})
    ])
  };
  