const express = require('express');
var app = express.Router();
const appRoot = require('app-root-path');
const Stores = require(appRoot+'/lib/Stores');
app.get('/list',function (req,res,next){
  Stores.list().then((items)=>{
    res.send(items)
  });
})
module.exports = app;
