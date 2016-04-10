"use strict";

module.exports = function (err, convo) {
  if(err) {
    console.log(err);
  } else {
    convo.say(`
      I am Abelios.
    `);
  }
}
