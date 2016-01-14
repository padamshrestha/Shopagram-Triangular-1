(function() {
    'use strict';

    angular
        .module('app.shopagram.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(AuthService, $state) {
        var vm = this;
        vm.testData = ['Connect', 'to', 'Instagram'];
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            console.log("This is the authedUser ", vm.authedUser);
        });
        
        vm.getProfile = function() {
            AuthService.fetchInstagram().then(function (dataFromService) {
                vm.finalData = dataFromService;
                console.log("this is final data ", vm.finalData);
                $state.go('triangular.admin-default.posts');
            });
        };
    }
    
})();
