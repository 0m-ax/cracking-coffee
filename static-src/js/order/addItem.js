angular.module('order.addItem', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addItem/:itemID', {
    templateUrl: '/static/templates/checkout/addItem.html',
    controller: 'addItemCtrl'
  });
}])
.controller('addItemCtrl', ['$scope','Order','$location','Item','$routeParams',function($scope,Order,$location,Item,$routeParams) {
  $scope.options = [];
  Item.get($routeParams.itemID).then((item)=>{
    $scope.item = item;
  })
  $scope.addItem = function (){
    Order.addItem($routeParams.itemID,$scope.options).then(()=>{
      $location.path('/order')
    })
  }
}])
