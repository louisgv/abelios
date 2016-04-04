"use strict";


module.exports = function (controller, mode) {
  controller.hears('what', mode, function (bot, message) {



    bot.reply(message, 'Hello!');
  });
}
