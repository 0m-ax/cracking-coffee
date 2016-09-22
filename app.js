//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
// load modules
//
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var user = require(appRoot+'/lib/user');
var tokenmod = require(appRoot+'/lib/tokens');
//
// passport setup
//
//rember me
passport.use(new RememberMeStrategy({key:'rememberme'},
  function(tokenid, cb) {
    console.log("getting token");
    tokenmod.get(tokenid)
    .then((Token)=>Token.delete().then(()=>Token))
    .then((Token)=>user.get(Token.data))
    .catch((error)=>{
      console.error(error,3)
    })
    .then((User)=>cb(null,User))
    .catch((error)=>{
      console.log(error,tokenid)
      cb(null, false);
    })
  },
  function(User, done) {
    console.log("setting token");

    tokenmod.make(User.id)
    .then((Token)=>done(null, Token.id))
  }
));
//local
passport.use(new LocalStrategy(
function(username, password, cb) {
  user.auth('email',username,password).then((User)=>{
    cb(null,User)
  }).catch((error)=>{
    console.log(error)
    cb(null, false);
  })
}));
//twitter
passport.use(new TwitterStrategy({
  consumerKey: config.oauth.twitter.consumerKey,
  consumerSecret: config.oauth.twitter.consumerSecret
}, function(token, tokenSecret, profile, cb) {
    user.auth('twitterid',profile.id)
    .catch(()=>{
      return user.createTwitter(token,tokenSecret,profile)
    })
    .then((User)=>cb(null,User))
    .catch(()=>{
      cb(null, false);
    })
}));
//facebook
passport.use(new FacebookStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
    callbackURL: config.baseurl+'login/facebook'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return done(null, profile);
}));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  user.get(id).then((User)=>{
    cb(null, User);
  }).catch((err)=>{
    cb(err);
  })
});

//
// initialise express
//
var app = express();
app.set('views', appRoot + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');
app.use(require('express-ejs-layouts'));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore(config.session.redis)
}));
//
// start passport
//
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

app.use('/',require(appRoot+'/app/'))
//
//Debug stuff
//
if ( app.get('env') === 'development' ) {
  console.info("entering dev mode")
  app.use('/debug',require('./debug.js'))
}
//
//auth managment roots
//
app.post('/login/email',
  passport.authenticate('local', { failureRedirect: '/login/email' }),
  function(req, res) {
    res.redirect('/account');
});
app.get('/login/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
  function(req, res) {
    res.redirect('/account');
});
app.get('/login/twitter',
  passport.authenticate('twitter', { failureRedirect: '/login/twitter' }),
  function(req, res) {
    tokenmod.make(req.user.id).then((Token)=>{
      console.log(Token.id)
      res.cookie('rememberme', Token.id, {
        path:'/',
        httpOnly:true,
        maxAge: 604800000
      });
      res.redirect('/account');
    }).catch(()=>{
      res.redirect('/account');
    })

});
//
// start the app
//
app.listen(config.port);
