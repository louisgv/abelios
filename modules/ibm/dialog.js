let watson = require('watson-developer-cloud');

let secret = require('../credential')
  .auth.nlc;

let dialog = watson.dialog({
  username: secret.username,
  password: secret.password,
  version: 'v1'
});

dialog.getDialogs({}, function (err, dialogs) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(dialogs, null, 2));
});
