(function() {
    'use strict';

    angular
        .module('app.shopagram.shop')
        .controller('ShopController', ShopController);

    /* @ngInject */
    function ShopController(AuthService) {
        var vm = this;
        vm.testData = ['Connect', 'to', 'Instagram'];
        
        vm.connectInstagram = function() {
            console.log("connecting to instagram");
            AuthService.connectInstagram().then(function(data) {
            console.log("Data", data);
        });
       };
    }
})();
