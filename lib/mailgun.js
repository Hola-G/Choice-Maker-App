var mailgun = require("mailgun-js");
var api_key = 'key-94edd4a9375d872c76b0f66746b3bd45';
var DOMAIN = 'sandbox45b238c3f9274b2888a0b8533ceceaf4.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

function sendEmail(email = 'jonnyk20@gmail.com', viewLink = '<viewlink>', resultsLink = '<resultsLink>') {
  const text = `Your new poll is ready! \n View Link: ${viewLink} \n Results Link: ${resultsLink}`;
  
  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'jonnyk20@gmail.com',
    subject: 'Your new Poll',
    text: text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = sendEmail;