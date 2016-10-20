const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
app.get('/',function (req,res){
  res.send(req.order)
})
app.post('/addItem',
function (req,res,next){
  if(req.order.stage !== "order"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.addItem(req.body.id,req.body.options).then(()=>{
    next()
  })
})
app.post('/removeItem',
function (req,res,next){
  if(req.order.stage !== "order"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.removeItem(req.body.index).then(()=>{
    next()
  })
})
app.post('/updateItem',
function (req,res,next){
  if(req.order.stage !== "order"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.updateItem(req.body.index,req.body.options)
  .then(()=>{
    next()
  })
})
app.post('/setStore',
function (req,res,next){
  if(req.order.stage !== "store-select"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.setStore(req.body.id)
  .then(()=>{
    next()
  })
})
app.get('/checkout',
function (req,res,next){
  if(req.order.stage !== "order"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.checkout()
  .then(()=>{
    next()
  })
})
app.get('/payed',
function (req,res,next){
  if(req.order.stage !== "paying"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.payed()
  .then(()=>{
    next()
  })
})
app.get('/served',
function (req,res,next){
  if(req.order.stage !== "ready"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.served()
  .then(()=>{
    next()
  })
})
app.get('/ready',
function (req,res,next){
  console.log(req.order.stage)
  if(req.order.stage !== "payed"){
    res.send({error:true})
  }else{
    next()
  }
},
function (req,res,next){
  req.order.ready()
  .then(()=>{
    next()
  })
})
app.get('/cancled',
function (req,res,next){
  req.order.cancled()
  .then(()=>{
    next()
  })
})
app.get('/totalCost',function (req,res){
  res.send({
    totalCost:req.order.totalCost
  })
})
app.use(function(req,res){
  res.send(req.order)
})
module.exports = app;
