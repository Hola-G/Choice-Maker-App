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
  
  console.log(pollTitle);
  res.render("index");
});

app.get("/createpoll", (req, res) => {
  res.render("createpoll");
});

app.get("/poll-successfully-created", (req, res) => {
  res.render("poll-successfully-created");
});

app.get("/poll", (req, res) => {
  res.render("poll");
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


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
