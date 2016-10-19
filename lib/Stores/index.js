//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
var Store = require('./Store');
module.exports.list = function () {
  return r.table("stores").run()
  .then((stores)=>
    stores.map((item)=>new Store(item))
  );
};
module.exports.get = function (id){
  return r.table("stores").get(id).run()
  .then((store)=>
    new Store(store)
  )
}
module.exports.load = function (store) {
  return new Store(store);
};
