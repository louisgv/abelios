"use strict";

module.exports = function (err, convo) {
  if(err) {
    console.log(err);
  } else {
    convo.say('I am a bot that has just joined your team');
    convo.say('You must now /invite me to a channel so that I can be of use!');
  }
}
