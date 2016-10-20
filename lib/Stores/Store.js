'use strict';
//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
class Store {
  constructor(store){
    this.id = store.id;
    this.name = store.name;
  }
}
module.exports = Store;
