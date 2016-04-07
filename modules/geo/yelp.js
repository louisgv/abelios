"use strict";

let Yelp = require('yelp');

let yelp = new Yelp(require("../../key.json")
  .yelp[0]);

// See http://www.yelp.com/developers/documentation/v2/search_api

exports.getNearBy = function (term, lat, long, r, cb) {
  yelp.search({
    // term: term,
    category_filter: term,
    sort: 1,
    ll: `${lat}, ${long}`,
    radius_filter: r,
    actionlinks : true
  })
  .then(function (data) {
    console.log(data);
    cb(data);
  })
  .catch(function (err) {
    console.error(err);
  });
}
