const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Items = require(appRoot+'/lib/Items');
app.get('/list',function (req,res,next){
  Items.listItems().then((items)=>{
    res.send(items)
  })
})
app.get('/get/:itemID',function (req,res,next){
  Items.get(req.params.itemID).then((item)=>{
    res.send(item)
  })
})
module.exports = app;
