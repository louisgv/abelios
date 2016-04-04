"use strict";

let nlc = require('../modulas/ibm/nlc');

let cc = require('../modulas/ibm/concept')

module.exports = function (controller, mode) {
  controller.hears('what is (.*)', mode, function (bot, message) {

    let subject = message.match[1].replace(/[\W_]+/g,"");
    cc.getConcept(subject, function (respond) {
      let sr = JSON.stringify(respond, null, 2);
      console.log(sr);
      bot.reply(message, `${respond.abstract}`);
    })
  });
}
