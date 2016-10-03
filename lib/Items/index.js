var r = require('rethinkdbdash')(config.rethinkdb);
modules.exports.listItems = function () {
  r.table("items")
};
