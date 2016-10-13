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
    this.id = item.id;
    this.name = item.name;
    this.cost = item.cost;
    this.type = item.type;
    this.options = (item.options||[]).map((option)=>new Option(option))
  }
  applyOptions(options){
    this.options.forEach((val,key)=>this.options[key].select(options[key]))
  }
  get totalCost(){
    console.log(this.options)
    return this.options.reduce((total,option)=>total+option.options[option.selected].cost,this.cost)
  }
}
module.exports = Item;
