angular.module('order.error', ['ngRoute','order.services'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/error', {
    templateUrl: '/static/templates/checkout/error.html',
    controller: 'errorCtrl'
  });
}])
.controller('errorCtrl', ['$scope',function($scope) {

}])
