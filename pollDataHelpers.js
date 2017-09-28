require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

function DataHelpers(knex) {
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

let pollDataHelpers = DataHelpers(knex);

pollDataHelpers.getPollByID(1).then((obj) => {
    console.log('Poll Data: ', obj[0]);
});

pollDataHelpers.getOptionsByPollID(1).then((obj) => {
    console.log('Options Data: ', obj);
});


