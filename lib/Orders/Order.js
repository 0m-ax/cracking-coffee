'use strict';
var appRoot = require('app-root-path');
var user = require(appRoot+'/lib/user');
var Items = require(appRoot+'/lib/Items')
class Order {
  constructor(order) {
    this.id = order.id;
    var items = order.items || [];
    this.items = items.map((item)=>Items.load(item))
  }
  addItem(itemID,options){
    var self = this;
    return Items.get(itemID)
      .then((item)=>
        item.applyOptions(options)
        .then(self.items.push(item))
      )
  }
  getUser(){

  }
}
module.exports = Order;
