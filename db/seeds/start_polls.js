exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function () {
      return Promise.all([

        // poll
        knex('polls').insert({ poll_title: 'fruit', email: 'food@food.com'}),

        // 3 options
        knex('options').insert({poll_id: 1, option_name: 'apple'}),
        knex('options').insert({poll_id: 1, option_name: 'banana'}),
        knex('options').insert({poll_id: 1, option_name: 'orange'}),

        // 2 submissions ( 6 votes )
        knex('votes').insert({ option_id: 1, score: 5}),
        knex('votes').insert({ option_id: 2, score: 2}),
        knex('votes').insert({ option_id: 3, score: 4}),
        knex('votes').insert({ option_id: 1, score: 9}),
        knex('votes').insert({ option_id: 2, score: 1}),
        knex('votes').insert({ option_id: 3, score: 5}),

      ]);
    });
};
