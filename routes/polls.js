'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
    const dataHelper  = require('../lib/data-helpers.js')(knex);
    
    // Home page
    router.get("/", (req, res) => {
        res.render("index");
    });

    router.get("/createpoll", (req, res) => {
        res.render("createpoll");
    });

    router.post("/createpoll", (req, res) => {
        let poll_title = req.body.poll_title;
        let email = req.body.email;
        let options = req.body.options;

        dataHelper.createPoll(poll_title, email).then((results) => {
            dataHelper.createOptions(results[0], options).then((results) => {
                res.send("Success!" + results);
            })
        })
    });

    router.get("/poll-successfully-created", (req, res) => {
        res.render("poll-successfully-created");
    });

    router.get("/poll/:id", (req, res) => {
        return Promise.all([dataHelper.getPollByID(req.params.id), dataHelper.getOptionsByPollID(req.params.id)])
            .then((results) => {
                let poll = { poll_title: results[0][0].poll_title, email: results[0][0].email, options: results[1] }
                res.render("poll", { poll: poll });
            });
    });

    router.get("/results/:id", (req, res) => {
        let poll = {
            poll_title: 'Whats your favorite color?',
            email: 'chad@you.com',
            options: [
                { option_name: 'Red', option_desc: 'I just love red!', score: 232 },
                { option_name: 'Blue', option_desc: 'The sky is blue!', score: 132 },
                { option_name: 'Green', option_desc: 'Grass isnt always greener!', score: 82 },
                { option_name: 'Black', option_desc: 'Its a dark, dark world..!', score: 15 }
            ]
        }

        res.render("results", { poll: poll });
    });

    router.get("/thankyou", (req, res) => {
        res.render("thankyou");
    });


    router.post("/poll", (req, res) => {
        dataHelper.submitVotes(req.body.options).then((results) => {
            res.status(200).send();
        });
    })

    return router;

}