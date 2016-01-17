(function() {
    'use strict';

    angular
        .module('app.shopagram.products')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController($scope, AuthService) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            $scope.authedUser = data.user;
            console.log("This is the authedUser ", $scope.authedUser);
        });
        
        $scope.getCreatedProducts = function() {
            AuthService.getCreatedProducts().then(function(response) {
                $scope.createdProducts = response;
                console.log("These are the created Products", $scope.createdProducts);
            });
        };
        $scope.getCreatedProducts();
    }
})();
