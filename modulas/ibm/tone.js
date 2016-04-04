"use strict";

var request = require('request');

var secret = require('../credential')
  .auth.tone;

var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: secret.username,
  password: secret.password,
  version: 'v3-beta',
  version_date: '2016-02-11'
});

exports.analyzeText = function (text, callback) {
  tone_analyzer.tone({
      text: text
    },
    function (err, tone) {
      if(err)
        console.log(err);
      else
        callback(tone);
    });
}
