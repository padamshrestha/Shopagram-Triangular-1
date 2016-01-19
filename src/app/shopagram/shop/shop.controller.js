(function() {
    'use strict';

    angular
        .module('app.shopagram.shop')
        .controller('ShopController', ShopController);

    /* @ngInject */
    function ShopController(AuthService) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
        });
       
    } 
})();
