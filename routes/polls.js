'use strict';

const express = require('express');
const sendMail = require('../lib/mailgun.js');
const router = express.Router();
var formidable = require('formidable');

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
       
        // parse form
    const parse = new Promise (function(resolve, reject){
        form.parse(req, function (err, fields, files) {
            console.log(files)
            const newPoll = {};
            newPoll.options = [];
            newPoll.poll_title = fields.poll_title;
            newPoll.email = fields.email;
            Object.keys(fields).slice(2).forEach(function(element, index) {
                if (!(index % 2)) {
                    newPoll.options.push({ name: fields[element] })
                } else {
                    newPoll.options[newPoll.options.length-1].description = fields[element];
                } 
            });
            resolve(newPoll);
        })

    });

    parse.then(function(newPoll){
        console.log(newPoll)
    })
        form.on('fileBegin', function (name, file){
            console.log(file)
            if (file.name !== '') {
                file.path = __dirname + '/../public/uploads/' + file.name;
            }
        });

        // let options = req.body.options;

        // if (!poll_title || !email || !options) {
        //     return res.sendStatus(500);
        // }

        // dataHelper.createPoll(poll_title, email).then((poll_id) => {
        //     dataHelper.createOptions(poll_id[0], options).then((results) => {
        //         sendMail(email, poll_id[0]);
        //         return res.status(200).json({ poll_id: poll_id[0] });
        //     })
        // })

        res.redirect("/createpoll");
    });

    router.get("/poll-successfully-created", (req, res) => {
        res.render("poll-successfully-created");
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
                //console.log(results[1]);
                let options = results[1].map(function(option) {
                    if (option.sum === null) { option.sum = '0'; }
                    option.option_name = escape(option.option_name);
                    option.option_desc = escape(option.option_desc);
                    return option;
                });
                //console.log(options);
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

    router.get('/upload', function (req, res){
        res.render("upload");
    });

    router.post('/upload', function (req, res){


        var form = new formidable.IncomingForm();

    
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            console.log(files)
        });
    
        form.on('fileBegin', function (name, file){
            if (file.name !== '') {
                file.path = __dirname + '/../public/uploads/' + file.name;
            }
        });
    
        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });
    
        res.redirect('/thankyou');
    });
    

    return router;

}