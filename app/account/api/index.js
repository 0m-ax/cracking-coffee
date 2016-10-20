const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
var bodyParser = require('body-parser')
app.use(bodyParser.json())

const Items = require(appRoot+'/lib/Items');
app.use('/order',function (req,res,next){
  req.user.getOrder()
    .then((order)=>req.order=order)
    .then(()=>next())
    .catch((error)=>{
      console.log(error)
    })
})
app.use('/order',require('./order'))
app.use('/items',require('./items'))
app.use('/stores',require('./stores'))

module.exports = app;
