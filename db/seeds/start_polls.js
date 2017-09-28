exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('votes').insert({ option_id: 1, score: 5}),
        knex('votes').insert({ option_id: 2, score: 2}),
        knex('votes').insert({ option_id: 3, score: 4}),
        knex('votes').insert({ option_id: 1, score: 9}),
        knex('votes').insert({ option_id: 2, score: 1}),
        knex('votes').insert({ option_id: 3, score: 5})
    ])
  };
  