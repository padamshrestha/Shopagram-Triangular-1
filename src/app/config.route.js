(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig)
        .run(runAuth);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider

        .state('404', {
            url: '/404',
            templateUrl: '404.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        })

        .state('500', {
            url: '/500',
            templateUrl: '500.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        });


        // set default routes when no path specified
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');
    }

    function runAuth($rootScope, $state, AuthService, AUTH_EVENTS) {
      $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if (!AuthService.isAuthenticated()) {
          console.log("moving to", next.name);
          if (next.name !== 'authentication.login' && next.name !== 'authentication.signup' && next.name !== 'authentication.forgot' && next.name !== 'auth.forgot-password' && next.name !== 'shop') {
            event.preventDefault();
            $state.go('authentication.login');
          }
        }
      });
    }

})();
