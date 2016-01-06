(function() {
    'use strict';

    angular
        .module('app.shopagram.dashboard')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/shopagram/dashboard');

        $stateProvider
        .state('triangular.admin-default.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/shopagram/dashboard/dashboard.tmpl.html',
            // set the controller to load for this page
            controller: 'DashboardController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.DASHBOARD.DASHBOARD-MODULE',
            state: 'triangular.admin-default.dashboard',
            icon: 'zmdi zmdi-account',
            type: 'link',
            priority: 1.1
            // children: [{
            //     name: 'MENU.DASHBOARD.DASHBOARD-PAGE',
            //     state: 'triangular.admin-default.dashboard',
            //     type: 'link'
            // }]
        });
    }
})();
