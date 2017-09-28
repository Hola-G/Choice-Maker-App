module.exports = function DataHelpers(knex) {
    return {

        getPollByID: (poll_id) => {
            return knex.select('poll_title', 'email').from('polls').where('id', poll_id);
        },
        
        getOptionsByPollID: (poll_id) => {
            return knex.select('option_name', 'option_desc').from('options').where('poll_id', poll_id);
        },

        getOptionsAndVotesByPollID: (poll_id) => {

        }
        
    }
}