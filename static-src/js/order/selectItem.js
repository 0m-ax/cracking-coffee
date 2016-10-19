angular.module('order.selectItem', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectItem', {
    templateUrl: '/static/templates/checkout/selectItem.html',
    controller: 'selectItemCtrl'
  });
}])
.controller('selectItemCtrl', ['$scope','Item',function($scope,Item) {
  Item.list().then((items)=>{
    $scope.items = items
  });
}])
