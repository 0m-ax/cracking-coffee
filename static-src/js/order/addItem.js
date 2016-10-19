angular.module('order.addItem', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addItem/:itemID', {
    templateUrl: '/static/templates/checkout/addItem.html',
    controller: 'addItemCtrl'
  });
}])
.controller('addItemCtrl', ['$scope','Order','$location','Item','$routeParams',function($scope,Order,$location,Item,$routeParams) {
  Item.get($routeParams.itemID).then((item)=>{
    $scope.item = item;
    $scope.options = item.options.map((option)=>option.default)
  })
  $scope.addItem = function (){
    Order.addItem($routeParams.itemID,$scope.options).then(()=>{
      $location.path('/order')
    })
  }
}])
