const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Orders = require(appRoot+'/lib/Orders');
app.use('/',function (req,res,next){
  req.user.getOrder()
    .then((order)=>req.order=order)
    .then(()=>next())
})
module.exports = app;
