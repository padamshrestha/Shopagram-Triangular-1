(function() {
    'use strict';

    angular
        .module('app.shopagram.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($state, AuthService) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            console.log("This is the authedUser ", vm.authedUser);
        });
        
        vm.getProfile = function() {
            AuthService.fetchInstagram().then(function (dataFromService) {
                vm.finalData = dataFromService;
                $state.go('triangular.admin-default.posts');
            });
        };
    }
    
})();
