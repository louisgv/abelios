"use strict";

var secret = require('../credential')
  .auth.alchemy;

var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
  api_key: secret.apikey
});

exports.getKeywords = function (text, callback) {
  alchemy_language.keywords({
    text: text
  }, function (err, response) {
    if(err)
      console.log('error:', err);
    else
      callback(response);
  });
}
