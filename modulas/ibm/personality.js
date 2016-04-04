"use strict";

var secret = require('../credential')
  .auth.personality;

var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: secret.username,
  password: secret.password,
  version: 'v2'
});

exports.analyzeProfile = function (text, callback) {
  personality_insights.profile({
      text : text
      // text : my_profile
    },
    function (err, profile) {
      if(err)
        console.log(err)
      else
        callback(profile);
    });
}
