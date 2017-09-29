'use strict';

const express = require('express');
const sendMail = require('../lib/mailgun.js');
const router = express.Router();

module.exports = (knex) => {
    const dataHelper = require('../lib/data-helpers.js')(knex);

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

        if (!poll_title || !email || !options) {
            return res.sendStatus(500);
        }

        dataHelper.createPoll(poll_title, email).then((poll_id) => {
            dataHelper.createOptions(poll_id[0], options).then((results) => {
                // sendMail(email, poll_id[0]);
                return res.sendStatus(200);
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
        return Promise.all([dataHelper.getPollByID(req.params.id), dataHelper.getOptionsAndVotesByPollID(req.params.id)])
            .then((results) => {
                let poll = { poll_title: results[0][0].poll_title, email: results[0][0].email, options: results[1] }
                res.render("results", { poll: poll });
            });
    });

    router.get("/thankyou", (req, res) => {
        res.render("thankyou");
    });


    router.post("/poll", (req, res) => {
        dataHelper.submitVotes(req.body.options)
            .then((results) => {
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(400);
            });
    })

    return router;

}