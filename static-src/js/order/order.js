angular.module('order.order', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order', {
    templateUrl: '/static/templates/checkout/order.html',
    controller: 'orderCtrl'
  });
}])
.controller('orderCtrl', ['$scope','Order','$location',function($scope,Order,$location) {
  Order.get().then((order)=>{
    $scope.items = order.items;
  })
  $scope.checkout = function (){
    Order.checkout().then(()=>{
      $location.path("/checkout");
    })
  }
}])
