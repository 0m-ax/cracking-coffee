//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
module.exports.get = function (id) {
  return Promise.resolve();
};
module.exports.new = function () {
  return Promise.resolve();
};
