"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./events/init')(PORT);

require('./events/rtm')(controller);

// REGEX

controller.hears('^stop', 'direct_message', function (bot, message) {
  bot.reply(message, 'Goodbye');
  bot.rtm.close();
});

// Receiving CV

controller.on('file_shared',function(bot,message) {

  console.log('FILE SHARED!');

  console.log(message);

  console.log(message.file.channels[0]);
  // message contains data sent by slack
  // in this case:
  // https://api.slack.com/events/channel_joined
  bot.say({
    text : JSON.stringify(message, null, 2),
    channel: message.file.ims[0]
  });
});


// EVAS

let nlc = require('./modules/ibm/nlc');

controller.on(["ambient", "mention", "direct_mention"], function (bot, message) {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function (err) {
    if(err) {
      console.log(err)
    }

    console.log(message);

    bot.reply(message,
      `I heard you loud and clear boss.
      ${message.text}`
    );
  });

});
