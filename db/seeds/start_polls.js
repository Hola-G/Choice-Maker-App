exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('polls').returning('id')
        .insert({ poll_title: 'test', email: 'test@test.com'})
          .then((ids) => {
            return knex('options').returning('id')
              .insert({
              poll_id: ids[0], option_name: 'testOption'
            })
          })
    ])
  };
  