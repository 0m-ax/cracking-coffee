const appRoot = require('app-root-path');
const users = require(appRoot+'/lib/user');
const express = require('express');
var app = express.Router();

app.get('/login',(req,res)=>{
  res.render('login');
})

app.get('/stores',(req,res)=>{
  res.render('stores');
})

app.get('/stores-select',(req,res)=>{
  res.render('stores-select');
})

app.get('/items',(req,res)=>{
  res.render('items');
})

app.get('/cart',(req,res)=>{
  res.render('cart');
})

app.get('/login/email',(req,res)=>{
  res.render('login/email');
})

app.get('/signup/email',(req,res)=>{
  res.render('signup/email');
})

app.post('/signup/email',(req,res)=>{
  users.createEmail(req.body.username,req.body.password)
  .then(()=>res.redirect('/login/email'))
  .catch((error)=>{
    console.log(error)
    throw error;
  })
  .catch(()=>res.redirect('/signup/email?error=true'))
})

module.exports= app;
