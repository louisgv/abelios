"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./events/init')(PORT);

require('./events/rtm')(controller);

// REGEX

let Help = require('./convos/help');

controller.hears("^help$", ["ambient", "direct_mention"], Help.show);

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

  bot.api.channels.list({}, (err, response) => {
    //Do something...
    response.channels.filter((chan) => {return chan.is_member}).map((c) => {
      console.log(c);
    })
  })

  let file = message.file;

  if(file.filetype === "pdf" || file.filetype === "docx") {

    doc.convert(bot.config.token, file.url_private, (docData) => {
      if(docData.warning) {
        bot.say({
          text: `There was some problem with the document, namely:
            > ${docData.warning}
            You might want to submit a PDF instead?`,
          channel: message.file.ims[0]
        })
        return;
      }
      bot.say({
        text: JSON.stringify(docData, null, 2),
        channel: message.file.ims[0]
      })

    })

  } else if(file.filetype === "png" || file.filetype === "jpg") {

    bot.say({
      text: `Awesome, we can use that for the job listing :)`,
      channel: message.file.ims[0]
    })

  } else {
    bot.say({
      text: `Oops, I can only process PDF or DOCX files for Resume; PNG or JPG for job listing. Please try again :sweat_smile:`,
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

    nlc.getClasses(message.text, function (classData) {
      bot.startPrivateConversation({
        user: message.user
      }, function (response, convo) {
        convo.say(JSON.stringify(classData, null, 2));
      })
    })
  });
});
