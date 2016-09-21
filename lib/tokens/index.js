//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
//load modules
//
var r = require('rethinkdbdash')(config.rethinkdb);
var Token = require('./Token.js')

module.exports.get = function (id) {
  return r.table('tokens').get(id).run()
  .then((token)=>{
    if(typeof token == "undefined"){
      throw "not found"
    }
    return token;
  })
  .then((token)=>new Token(token))
};
module.exports.make = function (data) {
  return r.table('tokens').insert({
    data:data
  }).run()
  .then((output)=>{
    return {
      id:output.generated_keys[0],
      data:data
    }
  })
  .then((token)=>new Token(token))
};
