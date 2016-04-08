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

let doc = require('./modules/ibm/doc');

controller.on('file_shared', function (bot, message) {

  // bot.say({
  //   text: JSON.stringify(message, null, 2),
  //   channel: message.file.ims[0]
  // });

  let file = message.file;

  if (file.filetype === "pdf" || file.filetype === "docx"){
    doc.convert(bot.config.token, file.url_private, function (response) {
      bot.say({
        text: `Awesome, seems like you are all set!`,
        channel: message.file.ims[0]
      })
    })
  } else {
    bot.say({
      text: `Oops, I can only process PDF or DOCX files. Please try again :sweat_smile:`,
      channel: message.file.ims[0]
    })
  }


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
