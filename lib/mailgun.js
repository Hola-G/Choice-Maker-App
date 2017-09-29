var mailgun = require("mailgun-js");
var api_key = 'key-94edd4a9375d872c76b0f66746b3bd45';
var DOMAIN = 'sandbox45b238c3f9274b2888a0b8533ceceaf4.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

function sendEmail(email, reference) {
  const text = `Your new poll is ready! \n View Link: http://localhost:8080/poll/${reference} \n Results Link: http://localhost:8080/results/${reference}`;
  
  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: 'Your new Poll',
    text: text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = sendEmail;