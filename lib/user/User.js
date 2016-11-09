'use strict';

//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');

//
//load modules
//
var r = require('rethinkdbdash')(config.rethinkdb);
var uuid = require('uuid');
const orders = require(appRoot+'/lib/Orders');

class User {
  constructor(user) {
    console.log(user)
    this.id = user.id;
    this.name = user.name || "Coffee Lover";
    this.email = user.email || null;
    this.twitter = user.twitter || null;
    this.facebook = user.facebook || null;
    this.order = user.order;
  }
  getOrder(){
    var self = this;
    if(self.order){
      return orders.get(self.order).then((order)=>{
        if(order.stage == "served" || order.stage == "cancled"){
          return self.newOrder();
        }else{
          return order;
        }
      })
    }else{
      return self.newOrder()
    }
  }
  newOrder(){
    var self = this;
    return orders.new(self.id)
    .then((order)=>
      self.update("order",order.id)
      .then(()=>order)
    )
  }
  update(key,value){
    var self = this;
    console.log("update")
    var update = {};
    update[key] = value;
    return r.table('users').get(this.id).update(update)
      .then(()=>{
        self[key] = value;
        return true;
      })
  }
}
module.exports = User;
