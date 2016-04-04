"use strict";

let Locu = require('locu');

let secret = require('../credential')
  .auth.locu;

let menu_client = new locu.MenuItemClient(secret.api_key);

menu_client.search({
  country: 'USA',
  name: 'burger',
  price__gte: 5,
  price__lt: 7
}, function (result) {
  console.log(result);
});
