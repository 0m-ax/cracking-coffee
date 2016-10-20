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
    $scope.options = item.options.map((option,key)=>{
      t = [];
      t[key] = option.default+1;
      return t;
    })
  })
  $scope.addItem = function (){
    Order.addItem($routeParams.itemID,$scope.options.map((option,key)=>{
      return option[key]-1;
    })).then(()=>{
      $location.path('/order')
    })
  }
}])
