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
      throw 'user not found';
    }else{
      return user;
    }
  })
  .then((user)=>new User(user))
}
module.exports.createEmail = function (email,password){
  return module.exports.check('email',email)
    .then((exists)=>{
      if(exists){
        throw 'user exists';
      }
    })
  .then(()=>bcrypt.hash(password, 10))
  .then((hash)=>{
    return {
      email:email,
      hash:hash
    }
  })
  .then((user)=>r.table('users').insert(user).run().then(()=>new User(user)))

}
module.exports.createTwitter = function (oauthToken,oauthTokenSecret,profile){
  return module.exports.check('twitterid',profile.id)
    .then((exists)=>{
      if(exists){
        throw 'user exists';
      }
    })
    .then(()=>{
      return {
        name:profile.displayName,
        twitter:{
          id:profile.id,
          username:profile.username,
          token:oauthToken,
          tokenSecret:oauthTokenSecret
        }
      }
    })
    .then(
      (user)=>r.table('users').insert(user).run()
        .then((insert)=>{
          user.id = insert.generated_keys[0]
          return user;
        })
        .then((user)=>new User(user))
    )
}
module.exports.check = function (key,id){
  return r.table('users').getAll(id, {index: key}).run()
  .then((users)=>{
    if(users.length == 0){
      return false;
    }else{
      return true;
    }
  })
}
module.exports.typeKey = function (type,account) {
  if(type){

  }
}
