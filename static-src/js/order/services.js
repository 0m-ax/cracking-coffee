angular.module('order.services',[])
.service('Order', function($http){
  var self = this;
  self.order = null;
  self.processRequest = function (resp){
    if(resp.statusText != "OK"){
      console.error(resp)
      throw "unknow error"
    }
    if(resp.data.error){
      console.error(resp)
      throw "unknow server error";
    }
    self.order = resp.data
    return self.order;
  }
  self.addItem = function (itemID,options){
    return $http.post("/account/api/order/addItem",{
      id:itemID,
      options:options
    }).then(self.processRequest)
  }
	self.get = function (force){
    if(force){
      force = true;
    }else{
      force = false;
    }
    if(self.order && !force){
      return Promise.resolve(self.order)
    }else{
      return $http.get("/account/api/order/").then(self.processRequest)
    }
  }
  self.selectStore = function (storeID){
    return $http.post("/account/api/order/setStore",{id:storeID}).then(self.processRequest)
  }
  self.pay = function (){
    return $http.get("/account/api/order/payed").then(self.processRequest)
  }
  self.checkout = function (){
    return $http.get("/account/api/order/checkout").then(self.processRequest)
  }
})
.service('Store', function($http){
  var self = this;
	self.list = function (){
    return $http.get("/account/api/stores/list").then((res)=>{
      return res.data;
    })
  }
})
.service('Item', function($http){
  var self = this;
	self.list = function (){
    return $http.get("/account/api/items/list").then((res)=>{
      return res.data;
    })
  }
  self.get = function (itemID){
    return $http.get("/account/api/items/get/"+itemID).then((res)=>{
      return res.data;
    })
  }
});
