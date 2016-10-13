const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Items = require(appRoot+'/lib/Items');
app.get('/list',function (req,res,next){
  Items.listItems().then((items)=>{
    res.send(items)
  })
})
module.exports = app;
