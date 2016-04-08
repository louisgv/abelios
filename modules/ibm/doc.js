"use strict";

let watson = require('watson-developer-cloud');

let secret = require('../credential')
  .auth.doc;

let request = require('request')

let document_conversion = watson.document_conversion({
  username: secret.username,
  password: secret.password,
  version: 'v1',
  version_date: '2015-12-01'
});

exports.convert = function (token, docURI, callback) {

  // convert a single document
  document_conversion.convert({
    // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
    file: request({
        url: docURI,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
    conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
    // Add custom configuration properties or omit for defaults
    word: {
      heading: {
        fonts: [
          {
            level: 1,
            min_size: 24
          },
          {
            level: 2,
            min_size: 16,
            max_size: 24
          }
        ]
      }
    }
  }, function (err, response) {
    if(err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
      callback(response);
    }
  });
}
