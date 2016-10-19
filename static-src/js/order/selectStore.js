angular.module('order.storeSelect', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/storeSelect', {
    templateUrl: '/static/templates/checkout/storeSelect.html',
    controller: 'storeSelectCtrl'
  });
}])
.controller('storeSelectCtrl', ['$scope','Store','$location','Order',function($scope,Store,$location,Order) {
  $scope.selectStore = function (id){
    Order.selectStore(id).then(()=>{
      $location.path("/selectItem");
    })
  }
  Store.list().then((stores)=>{
    $scope.stores = stores;
  })
}])
