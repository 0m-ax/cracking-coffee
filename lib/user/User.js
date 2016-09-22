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

class User {
  constructor(user) {
    console.log(user)
    this.id = user.id;
    this.name = user.name || "Coffee Lover";
    this.email = user.email || null;
    this.twitter = user.twitter || null;
    this.facebook = user.facebook || null;
  }
}
module.exports = User;
