angular.module('order.order', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order', {
    templateUrl: '/static/templates/checkout/order.html',
    controller: 'orderCtrl'
  });
}])
.controller('orderCtrl', ['$scope','Order','$location',function($scope,Order,$location) {
  Order.get().then((order)=>{
    $scope.items = order.items.map((item)=>{
      item.totalCost = item.options.reduce((value,option)=>{
        return option.options[option.selected].cost+value
      },item.cost)
      item.subText = item.options.reduce((value,option)=>{
        return value+option.options[option.selected].name+", "
      },"").slice(0, -2);
      return item;
    })
  })
  $scope.checkout = function (){
    Order.checkout().then(()=>{
      $location.path("/checkout");
    })
  }
}])
