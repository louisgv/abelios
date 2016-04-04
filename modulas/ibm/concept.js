/*
  Minerva
  Goddess of wisdom and sponsor of arts, trade, and strategy.
*/

"use strict";

String.prototype.capitalize = function () {
  return this.toLowerCase()
    .replace(/\b\w/g, function (m) {
      return m.toUpperCase();
    });
};

var request = require('request');

var secret = require('../credential')
  .auth.concept;

var watson = require('watson-developer-cloud');

if(secret.url !== 'lab') {
  var ci = watson.concept_insights({
    username: secret.username,
    password: secret.password,
    version: 'v2'
  });
}

// Retrieve the concepts for input text
exports.getConcepts = function (concept, level, limit, callback) {
  //v2/graphs/wikipedia/en-20120601/concepts/Banana/related_concepts?level=0&limit=10

  concept = concept.capitalize();

  var url = secret.url + '/v2/graphs/wikipedia/en-20120601/concepts/' + concept + '/related_concepts';

  var query = {
    level: level,
    limit: limit,
    concept_fields: JSON.stringify({
      thumbnail : 1,
      abstract: 1,
      ontology: 1
    })
  };

  request({
    url: url,
    method: 'GET',
    qs: query,
    json: true,
    auth: {
      'user': secret.username,
      'password': secret.password
    },
  }, function (error, response, body) {
    callback(body);
  });
};

exports.getConcept = function (concept, callback) {
  //v2/graphs/wikipedia/en-20120601/concepts/Banana/related_concepts?level=0&limit=10

  concept = concept.capitalize();

  var url = secret.url + '/v2/graphs/wikipedia/en-20120601/concepts/' + concept;

  request({
    url: url,
    method: 'GET',
    json: true,
    auth: {
      'user': secret.username,
      'password': secret.password
    },
  }, function (error, response, body) {
    callback(body);
  });
};

exports.getAnnotations = function (text, callback) {
  var url = secret.url + '/v2/graphs/wikipedia/en-20120601/annotate_text';

  console.log(text);
  request({
    url: url, //URL to hit
    method: 'POST',
    auth: {
      'user': secret.username,
      'password': secret.password
    },
    body: text, //Set the body as a string
    json: true,
    headers: {
      'content-type': 'text/plain'
    },
  }, function (error, response, body) {
    if(error) {
      console.log(error);
    } else {
      callback(response);
    }
  });
}
