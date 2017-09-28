exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('polls').insert({ poll_title: 'fruit', email: 'food@food.com'})
    ])
  };
  