//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
//load modules
//
var r = require('rethinkdbdash')(config.rethinkdb);
var User = require('./User');
var bcrypt = require('bcrypt-as-promised');



module.exports.get = function (userID){
  return r.table('users').get(userID).run()
    .then((user)=>new User(user))
};
module.exports.auth = function (type,account,password){
  return r.table('users').getAll(account, {index: type}).run()
  .then((user)=>user[0])
  .then((user)=>{
    if(type == "email"){
      if(typeof user == "undefined"){
        throw 'user not found'
      }else{
        return bcrypt.compare(password,user.hash).then(()=>user);
      }
    }else if(typeof user == 'undefined'){
      return module.exports.create(type,account)
    }else{
      return user;
    }
  })
  .then((user)=>new User(user))
}
module.exports.create = function (type,account,password){
  return r.table('users').getAll(account, {index: type}).run()
  .then((users)=>{
    if(users.length != 0){
      throw 'account in use';
    }
  })
  .then(()=>{
    if(type == "email"){
      return bcrypt.hash(password, 10)
        .them((hash)=>{
          return {
            email:account,
            hash:hash
          };
        })
    }else{
      user = {};
      user[type]=account;
      return user;
    }
  })
  .then((user)=>{
    r.table('users').insert(user).run().then(()=>user)
  })
}
