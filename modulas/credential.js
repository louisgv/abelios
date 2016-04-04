/*
  Hekate
  Powerful and wise gate keeper between the worlds
*/

'use strict';

function initAuth(cred) {
  return {
    url: cred.url,
    usn: cred.username,
    pwd: cred.password,
  }
}

let auth = {}

let key = require('../key.json');

// Check if BLUEMIX env exist
if(process.env.VCAP_SERVICES) {
  let vcapServices =
    JSON.parse(process.env.VCAP_SERVICES);

  auth = {
    // alchemy: vcapServices.alchemy_api[0].credentials,
    // cloudant : vcapServices.cloudantNoSQLDB[0].credentials,
    // redis : vcapServices.rediscloud[0].credentials,
    // personality: vcapServices.personality_insights[0].credentials,
    // toneAuth: vcapServices.tone_analyzer[0].credentials,
    // relationship: vcapServices.relationship_extraction[0].credentials,

    concept: vcapServices.concept_insights[0].credentials,
    nlc: vcapServices.natural_language_classifier[0].credentials,
    slack : key.slack[0]
  }
} else {

  auth = {
    // cloudant : key.cloudantNoSQLDB[0].credentials,
    // redis : key.rediscloud[0].credentials,
    // personality: key.personality_insights[0].credentials,
    // toneAuth: key.tone_analyzer[0].credentials,
    // relationship: key.relationship_extraction[0].credentials,
    // alchemy: key.alchemy_api[0].credentials,
    concept: key.concept_insights[0].credentials,
    nlc: key.natural_language_classifier[0].credentials,
    slack : key.slack[0]
  }
}

// Export keys
exports.auth = auth;

module.exports = exports;
