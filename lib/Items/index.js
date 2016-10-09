//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
var Item = require('./Item');
module.exports.listItems = function () {
  r.table("items")
};
module.exports.load = function (item) {
  return new Item(item);
};
