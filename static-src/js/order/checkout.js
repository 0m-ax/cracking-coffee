angular.module('order.checkout', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkout', {
    templateUrl: '/static/templates/checkout/checkout.html',
    controller: 'checkoutCtrl'
  });
}])
.controller('checkoutCtrl', ['$scope','Order','$location',function($scope,Order,$location) {
  $scope.pay = function (){
    Order.pay()
    .then(()=>{
      $location.path('/payed');
    })
  }
}])
