angular.module('order.autoPick', ['ngRoute','order.services'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/autoPick', {
    templateUrl: '/static/templates/checkout/autoPick.html',
    controller: 'autoPickCtrl'
  });
}])
.controller('autoPickCtrl', ['$scope','Order','$location',function($scope,Order,$location) {
  Order.get().then((order)=>{
    console.log(order.stage);
    switch (order.stage) {
      case "store-select":
        $location.path("/storeSelect");
        break;
      case "order":
          if(order.items.length == 0){
            $location.path("/selectItem");
          }else{
            $location.path("/order");
          }
        break;
      case "paying":
        $location.path("/checkout")
        break;
      case "waiting":
        $location.path("/waiting")
        break;
      case "payed":
        $location.path("/payed")
        break;
      case "ready":
        $location.path("/ready")
        break;
      case "served":
        $location.path("/served")
        break;
      default:
        $location.path("/error");
    }
  });
}])
