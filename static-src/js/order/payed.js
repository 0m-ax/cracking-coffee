angular.module('order.payed', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/payed', {
    templateUrl: '/static/templates/checkout/payed.html',
    controller: 'payedCtrl'
  });
}])
.controller('payedCtrl', ['$scope','Order','$location','$timeout',function($scope,Order,$location,$timeout) {
  updateFN = function () {
    Order.get(true).then((order)=>{
      $scope.order = order;
      if(order.stage!="payed"){
        $location.path("/ready")
      }
    }).catch(()=>{})
    .then(()=>{
      $timeout(updateFN,500)
    })
  }
  updateFN()
}])
