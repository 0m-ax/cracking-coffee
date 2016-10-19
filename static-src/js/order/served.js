angular.module('order.served', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/served', {
    templateUrl: '/static/templates/checkout/served.html',
    controller: 'servedCtrl'
  });
}])
.controller('servedCtrl', ['$scope','Order','$location','$timeout',function($scope,Order,$location,$timeout) {

}]);
