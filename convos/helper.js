"use strict";

exports.infoResponse = function (label, text, link, imgSrc) {
  return {
    'username': 'InfoBot',
    'icon_emoji': ':nerd_face:',
    attachments: [{
      "title": label,
      "fallback": text,
      "text": text,
      "color": "#36a64f",
      "title_link": link,
      "thumb_url": imgSrc
    }]
  }
}
