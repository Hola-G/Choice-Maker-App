"use strict";

require('dotenv').config();

const PORT            = process.env.PORT || 8080;
const ENV             = process.env.ENV || "development";
const express         = require("express");
const bodyParser      = require("body-parser");
const sass            = require("node-sass-middleware");
const app             = express();

const knexConfig      = require("./knexfile");
const knex            = require("knex")(knexConfig[ENV]);
const morgan          = require('morgan');
const knexLogger      = require('knex-logger');
const dataHelper  = require('./lib/data-helpers.js')(knex);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
//app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: false,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
  dataHelper.getPollByID(1).then((results) => {
    let pollTitle = results[0].poll_title;
    console.log(pollTitle);
    res.render("index", { pollTitle: pollTitle });
  });
});

app.get("/createpoll", (req, res) => {
  res.render("createpoll");
});

app.post("/createpoll", (req, res) => {
  let poll_title = req.body.poll_title;
  let email = req.body.email;
  let options = req.body.options;

  dataHelper.createPoll(poll_title, email).then((results) => {
    dataHelper.createOptions(results[0], options).then((results) => {
      res.send("Success!" + results);
    })
  })
});

app.get("/poll-successfully-created", (req, res) => {
  res.render("poll-successfully-created");
});

app.get("/poll/:id", (req, res) => {
  return Promise.all([dataHelper.getPollByID(req.params.id),dataHelper.getOptionsByPollID(req.params.id)])
    .then((results) => {
    let poll = { poll_title: results[0][0].poll_title, email: results[0][0].email, options: results[1] }
    res.render("poll", { poll: poll });
  });
});

app.get("/results/:id", (req, res) => {
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

app.get("/thankyou", (req, res) => {
  res.render("thankyou");
});


app.post("/poll", (req, res) => {
  dataHelper.submitVotes(req.body.options).then((results) => {
    res.status(200).send();
  });
  // console.log(req);
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
