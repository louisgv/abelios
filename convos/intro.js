"use strict";

module.exports = function (err, convo) {
  if(err) {
    console.log(err);
  } else {
    convo.say('I am Abelios.');
    convo.say('You should /invite me to a channel (#job), so that I can post useful listing there!');
  }
}
