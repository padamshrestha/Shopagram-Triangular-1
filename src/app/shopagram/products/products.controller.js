(function() {
    'use strict';

    angular
        .module('app.shopagram.products')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController($scope, AuthService, $mdDialog, $mdMedia) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            $scope.authedUser = data.user;
            console.log("This is the authedUser ", $scope.authedUser);
        });
        
        $scope.getCreatedProducts = function() {
            AuthService.getCreatedProducts().then(function(response) {
                $scope.createdProducts = response;
            });
        };
        $scope.getCreatedProducts();
        
        $scope.showProduct = function(index) {
            console.log("These are the showproducts", $scope.createdProducts[index].product);
            $scope.showModalProduct = $scope.createdProducts[index].product;
            $scope.confirmRemoveProduct = $scope.createdProducts[index]._id;
        };
        
        $scope.removeProduct = function(id) {
            AuthService.removeProduct(id).then(function(response) {
            $scope.createdProducts = response;
            console.log("Products left", $scope.createdProducts)
          });
        };
        
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        
         $scope.productModal = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            openFrom: "#left",
            templateUrl: 'app/shopagram/products/productsModal.tmpl.html',
            controller: ProductModalController,
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
            })
            $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
        
            function ProductModalController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
           }
    }
})();
