const express = require('express');
var app = express.Router();
app.get('/',(req,res)=>{
  req.resdata.nav[0].selected = true
  res.render('index',req.resdata);
})


app.get('/stores',(req,res)=>{
  req.resdata.nav[1].selected = true
  res.render('stores',req.resdata);
})

app.get('/bersta',(req,res)=>{
  req.resdata.nav[2].selected = true
  res.render('bersta/index',req.resdata);
})
app.use('/api',require('./api'))
app.use('/',require('./auth.js'))
app.use('/account',
  require('connect-ensure-login').ensureLoggedIn(),
  require('./account/')
)
module.exports= app;
