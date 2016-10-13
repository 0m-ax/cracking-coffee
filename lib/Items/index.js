//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
var Item = require('./Item');
module.exports.listItems = function () {
  return r.table("items").run()
  .then((items)=>
    items.map((item)=>new Item(item))
  );
};
module.exports.get = function (id){
  return r.table("items").get(id).run()
  .then((item)=>
    new Item(item)
  )
}
module.exports.load = function (item) {
  return new Item(item);
};
