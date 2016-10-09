const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Orders = require(appRoot+'/lib/Orders');
const Items = require(appRoot+'/lib/Items');
app.use('/',function (req,res,next){
  req.user.getOrder()
    .then((order)=>req.order=order)
    .then(()=>next())
    .catch((error)=>{
      console.log(error)
    })
})
app.use('/api',require('./api/'))
app.get('/',function (req,res){
  res.send(req.order)
})
module.exports = app;
