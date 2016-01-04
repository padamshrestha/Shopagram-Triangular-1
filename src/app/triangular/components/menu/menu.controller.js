(function() {
    'use strict';

    angular
        .module('triangular.components')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(triSettings, triLayout, $scope, $state, AuthService, AUTH_EVENTS) {
        var vm = this;
        vm.layout = triLayout.layout;
        vm.sidebarInfo = {
            appName: triSettings.name,
            appLogo: triSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////
        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            triLayout.setOption('sideMenuSize', menu);
        }

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
          AuthService.logout();
          $state.go('authentication.login');
        });
    }
})();
