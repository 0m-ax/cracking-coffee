 'use strict';
var appRoot = require('app-root-path');
var user = require(appRoot+'/lib/user');
var Items = require(appRoot+'/lib/Items');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
class Order {
  constructor(order) {
    this.store = order.store;
    this.stage = order.stage || "store-select";
    this.id = order.id;
    var items = order.items || [];
    this.items = items.map((item)=>Items.load(item))
  }
  checkout(){
    this.stage = "paying";
    return this.save();
  }
  payed(){
    this.stage = "payed";
    return this.save()
  }
  ready(){
    this.stage = "ready";
    return this.save()
  }
  served(){
    this.stage = "served";
    return this.save()
  }
  cancled(){
    this.stage = "cancled";
    return this.save()
  }
  removeItem(index){
    this.items.splice(index, 1);
    return this.save();
  }
  addItem(itemID,options){
    var self = this;
    return Items.get(itemID)
      .then((item)=>{
        console.log(item)
        item.applyOptions(options)
        self.items.push(item)
      })
      .then()
      .then(()=>self.save())
  }
  setStore(storeID){
    this.stage = "order";
    this.store = storeID;
    return this.save();
  }
  order(){
    this.strage = "order";
    return this.save();
  }
  updateItem(index,options){
    return Promise.resolve(this.items[index].applyOptions(options))
    .then(()=>self.save())
  }
  save(){
    var self = this;
    return r.table('orders').get(this.id).update(this)
  }
  get totalCost(){
    return this.items.reduce((total,item)=>total + item.totalCost,0)
  }
}
module.exports = Order;
