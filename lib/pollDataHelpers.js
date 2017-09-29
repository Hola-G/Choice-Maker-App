module.exports = function DataHelpers(knex) {
    return {

        createPoll: (poll_title, email) => {
            return knex('polls').insert({ poll_title: poll_title, email: email }, 'id');
        },

        createOptions: (poll_id, option_array) => {
            let optionsWithPollID = option_array.map((option) => {
                option.poll_id = poll_id;
                return option;
            })
            return knex('options').insert(optionsWithPollID).returning('id');
        },

        getPollByID: (poll_id) => {
            return knex.select('poll_title', 'email').from('polls').where('id', poll_id);
        },
        
        getOptionsByPollID: (poll_id) => {
            return knex.select('id', 'option_name', 'option_desc').from('options').where('poll_id', poll_id);
        },

        getOptionsAndVotesByPollID: (poll_id) => {

        }
        
    }
}