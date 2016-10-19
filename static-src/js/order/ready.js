angular.module('order.ready', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ready', {
    templateUrl: '/static/templates/checkout/ready.html',
    controller: 'readyCtrl'
  });
}])
.controller('readyCtrl', ['$scope','Order','$location','$timeout',function($scope,Order,$location,$timeout) {
  updateFN = function () {
    Order.get(true).then((order)=>{
      $scope.order = order;
      if(order.stage!="ready"){
        $location.path("/served")
      }
    }).catch(()=>{})
    .then(()=>{
      $timeout(updateFN,500)
    })
  }
  updateFN()
}])
