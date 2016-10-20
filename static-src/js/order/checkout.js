angular.module('order.checkout', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkout', {
    templateUrl: '/static/templates/checkout/checkout.html',
    controller: 'checkoutCtrl'
  });
}])
.controller('checkoutCtrl', ['$scope','Order','$location',function($scope,Order,$location) {
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
  $scope.pay = function (){
    Order.pay()
    .then(()=>{
      $location.path('/payed');
    })
  }
}])
