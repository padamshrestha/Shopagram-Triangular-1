(function() {
    'use strict';

    angular
        .module('app.shopagram.profile')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(AuthService) {
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
