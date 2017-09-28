exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('polls').del(),
        knex('options').del(),
        knex('votes').del(),
        knex('polls').insert({ poll_title: 'fruit', email: 'food@food.com'}),
        knex('options').insert({poll_id: 1, option_name: 'apple'}),
        knex('options').insert({poll_id: 1, option_name: 'banana'}),
        knex('options').insert({poll_id: 1, option_name: 'orange'}),
        knex('votes').insert({ option_id: 1, score: 5}),
        knex('votes').insert({ option_id: 2, score: 2}),
        knex('votes').insert({ option_id: 3, score: 4}),
        knex('votes').insert({ option_id: 1, score: 9}),
        knex('votes').insert({ option_id: 2, score: 1}),
        knex('votes').insert({ option_id: 3, score: 5})
    ])
  };
  