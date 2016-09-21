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

class Token {
  constructor(token) {
    this.id = token.id;
    this.data = token.data;
  }
  delete(){
    return r.table('users').get(this.id).delete().run()
  }
}
module.exports = Token;
