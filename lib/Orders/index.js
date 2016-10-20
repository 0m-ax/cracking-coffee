//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
var Order =require('./Order')
module.exports.get = function (id) {
  return r.table('orders').get(id).then((output)=>new Order(output))
};
module.exports.new = function (userID) {
  return r.table('orders').insert({
    userID:userID
  }).run()
  .then((output)=>new Order({id:output.generated_keys[0]}))
};
module.exports.getWaiting = function (storeID) {
  return r.table('orders').filter(
    r.row("store").eq(storeID).and(
      r.row("stage").eq("ready").or(
        r.row("stage").eq("payed")
      )
    )
  ).run()
  .then((stores)=>stores.map((store)=>new Order(store)))
};
