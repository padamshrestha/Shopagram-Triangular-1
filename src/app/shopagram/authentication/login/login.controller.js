(function() {
    'use strict';

    angular
        .module('app.shopagram.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, triSettings, AuthService) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form

        vm.user = {
          name: '',
          password: ''
        };

        vm.login = function() {
          AuthService.login(vm.user).then(function(msg) {
            console.log(msg);
            $state.go('triangular.admin-default.dashboard');
          }, function(errMsg) {
            console.log(errMsg);
          });
        };

        ////////////////

        function loginClick() {
            $state.go('triangular.admin-default.introduction');
        }
    }
})();
