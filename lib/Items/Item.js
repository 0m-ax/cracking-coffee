'use strict';
//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
var Option = require(appRoot+'/lib/Option')
class Item {
  constructor(item){
    this.type = item.type;
    this.options = (item.options||[]).map((option)=>new Option(option))
  }
}
module.exports = Item;
