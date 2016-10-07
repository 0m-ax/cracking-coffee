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
    console.log(user,"test")
    this.name = user.name || "Coffee Lover";
    this.email = user.email || null;
    this.twitter = user.twitter || null;
    this.facebook = user.facebook || null;
    this.order = user.order;
  }
  getOrder(){
    var self = this;
    if(self.order){
      return orders.get(self.order)
    }else{
      return orders.new().then((order)=>
        self.update("order",order.id)
        .then(()=>order)
      )
    }
  }
  newOrder(){
    var self = this;
    return orders.new().then((order)=>
      self.update("order",order.id)
      .then(()=>order)
    )
  }
  update(key,value){
    var self = this;
    var update = {};
    update[key] = value;
    return r.table('users').get(this.id).update(value)
      .then(()=>{
        self[key] = value;
        return true;
      })
  }
}
module.exports = User;
