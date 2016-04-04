"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./evas/init')(PORT);

require('./evas/rtm')(controller);

let AMDTDS = ["ambient", "mention", "direct_mention", "direct_message"];

// REGEX

require('./regas/what')(controller, AMDTDS);

controller.hears('^stop', 'direct_message', function (bot, message) {
  bot.reply(message, 'Goodbye');
  bot.rtm.close();
});

// EVAS

controller.on(['direct_message', 'mention', 'direct_mention'], function (bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function (err) {
    if(err) {
      console.log(err)
    }
    bot.reply(message, 'I heard you loud and clear boss.');
  });
});
