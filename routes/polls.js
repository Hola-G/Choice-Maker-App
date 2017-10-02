'use strict';

const express = require('express');
const sendMail = require('../lib/mailgun.js');
const router = express.Router();
var formidable = require('formidable');

function createnewPollObject(fields, files) {
    // get option number (to match files and options)
    function getOptionNumber(str) {
        return parseInt(str.split('_')[2], 10);
    }
    // initiate new poll object
    const newPoll = {
        options: []
    };
    newPoll.email = fields[0][1];
    newPoll.poll_title = fields[1][1];

    // add options to object
    fields.slice(2).forEach(function(field, index) {
        if (field[0].includes('name')) {
            newPoll.options.push({ option_name: field[1], orderIndex: getOptionNumber(field[0]) })
        } else {
            newPoll.options[newPoll.options.length-1].option_desc = field[1];
        } 
    });

    // add images to options
    files.forEach(function(file){
        if (file[1].name) {
            newPoll.options.find(option => option.orderIndex === getOptionNumber(file[0])).option_url = file[1].name;
        }
    });

    // delete orderIndex from options object
    newPoll.options.forEach(option => delete option.orderIndex);

    return newPoll;
}


module.exports = (knex) => {
    const dataHelper = require('../lib/data-helpers.js')(knex);

    router.get("/", (req, res) => {
        res.render("createpoll");
    });

    router.get("/createpoll", (req, res) => {
        res.render("createpoll");
    });

    router.post("/createpoll", (req, res) => {

        var form = new formidable.IncomingForm();
        const files = [];
        const fields = [];
        let newPoll;

        form.on('field', function(field, value) {
            fields.push([field, value]);
        })

        form.on('fileBegin', function (name, file){
            if (file.name !== '') {
                file.path = __dirname + '/../public/uploads/' + file.name;
            }
        });

        form.on('file', function(field, file) {
            files.push([field, file]);
        })

        form.on('end', function() {
            newPoll = createnewPollObject(fields, files);
            if (!newPoll.poll_title || !newPoll.email || !newPoll.options) {
                return res.sendStatus(400);
            }
            dataHelper.createPoll(newPoll.poll_title, newPoll.email).then((poll_id) => {
                dataHelper.createOptions(poll_id[0], newPoll.options).then((results) => {
                    sendMail(newPoll.email, poll_id[0]);
                    return res.redirect('/results/' + poll_id[0]);
                })
            })
        });
        form.parse(req);
    });

    router.get("/poll/:id", (req, res) => {
        return Promise.all([dataHelper.getPollByID(req.params.id), dataHelper.getOptionsByPollID(req.params.id)])
            .then((results) => {
                let poll = { poll_id: req.params.id, poll_title: results[0][0].poll_title, email: results[0][0].email, options: results[1] }
                res.render("poll", { poll: poll });
            });
    });

    router.get("/results/:id", (req, res) => {
        return Promise.all([dataHelper.getPollByID(req.params.id), dataHelper.getOptionsAndVotesByPollID(req.params.id)])
            .then((results) => {
                let poll = { poll_id: req.params.id, poll_title: results[0][0].poll_title, email: results[0][0].email, options: results[1] }
                res.render("results", { poll: poll });
            });
    });

    router.get("/results/:id/json", (req, res) => {
        return Promise.all([dataHelper.getPollByID(req.params.id), dataHelper.getOptionsAndVotesByPollID(req.params.id)])
            .then((results) => {
                let options = results[1].map(function(option) {
                    if (option.sum === null) { option.sum = '0'; }
                    option.option_name = escape(option.option_name);
                    option.option_desc = escape(option.option_desc);
                    return option;
                });
                let poll = { poll_id: req.params.id, poll_title: escape(results[0][0].poll_title), email: results[0][0].email, options: options }
                res.json({ poll });
            });
    });

    router.get("/thankyou", (req, res) => {
        res.render("thankyou");
    });

    router.post("/poll", (req, res) => {
        dataHelper.submitVotes(req.body.options)
            .then((results) => {
                res.redirect('/thankyou');
            }).catch((error) => {
                res.sendStatus(400);
            });
    })

    return router;

}