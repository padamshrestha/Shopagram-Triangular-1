(function() {
    'use strict';

    angular
        .module('app.shopagram.shop')
        .controller('ShopController', ShopController);

    /* @ngInject */
    function ShopController(AuthService, $stateParams) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            //vm.authedUser.profile.storeName is what I want to use on the id
        });
        
        AuthService.getProductsForUser($stateParams.id).then(function(response) {
            vm.shopProducts = response.products;
            console.log("Created Products", vm.shopProducts);
        });
       
    } 
})();
