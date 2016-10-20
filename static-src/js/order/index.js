'use strict';



// Declare app level module which depends on views, and components
angular.module('order', [
  'ngRoute',
  'order.storeSelect',
  'order.autoPick',
  'order.order',
  'order.error',
  'order.selectItem',
  'order.checkout',
  'order.payed',
  'order.ready',
  'order.served',
  'order.addItem'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/autoPick'});
}]);
