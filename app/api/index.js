const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Order = require(appRoot+'/lib/Orders');
app.get('/list/:storeID',function (req,res,next){
  Order.getWaiting(req.params.storeID).then((items)=>{
    res.send(items)
  })
})
app.get('/ready/:orderID',function (req,res,next){
  Order.get(req.params.orderID).then((order)=>{
    return order.ready()
  })
  .then(()=>{
    res.send({done:true})
  }).catch((error)=>{
    console.error(error)
    res.send({error:true})
  })
})
app.get('/served/:orderID',function (req,res,next){
  Order.get(req.params.orderID).then((order)=>{
    return order.served()
  })
  .then(()=>{
    res.send({done:true})
  }).catch((error)=>{
    console.error(error)
    res.send({error:true})
  })
})
module.exports = app;
