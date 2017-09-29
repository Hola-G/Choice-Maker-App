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
const pollDataHelper  = require('./lib/pollDataHelpers.js')(knex);

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
  pollDataHelper.getPollByID(1).then((results) => {
    let pollTitle = results[0].poll_title;
    console.log(pollTitle);
    res.render("index", { pollTitle: pollTitle });
  });
});

app.get("/createpoll", (req, res) => {
  res.render("createpoll");
});

app.post("/createpoll", (req, res) => {
  console.log(req.body);
  res.send('You have posted!');
});

app.get("/poll-successfully-created", (req, res) => {
  res.render("poll-successfully-created");
});

app.get("/poll", (req, res) => {
  let getPollData = Promise.all([
    pollDataHelper.getPollByID(1),
    pollDataHelper.getOptionsByPollID(1)
  ]).then((results) => {
    let poll = {
      poll_title: results[0][0].poll_title,
      email: results[0][0].email,
      options: results[1]
    }
    
    console.log(poll);
    res.render("poll", { poll: poll });
  });
});

app.get("/results", (req, res) => {
  res.render("results");
});

app.get("/thankyou", (req, res) => {
  res.render("thankyou");
});


app.post("/poll", (req, res) => {
  console.log(req);
})

app.post("/test", (req, res) => {
  console.log(req.body);
  res.end();
})

app.get("/chad", (req, res) => {
  let testArray = [
    { option_name: 'Blue', option_desc: '' },
    { option_name: 'red', option_desc: '' },
    { option_name: 'yellow', option_desc: '' }
  ]
  pollDataHelper.createOptions(1, testArray).then((result) => {
    console.log(result);
    res.status(201);
  }).catch((error) => {
    res.status(400);
  });
  res.send();
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
