(function() {
    'use strict';

    angular
        .module('app.shopagram.profile')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/shopagram/profile');

        $stateProvider
        .state('triangular.admin-default.shopProfile', {
            url: '/profile-settings',
            templateUrl: 'app/shopagram/profile/profile.tmpl.html',
            // set the controller to load for this page
            controller: 'ProfileController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.PROFILE.PROFILE-MODULE',
            state: 'triangular.admin-default.shopProfile',
            icon: 'zmdi zmdi-account',
            type: 'link',
            priority: 1.1
            // children: [{
            //     name: 'MENU.PROFILE.PROFILE-PAGE',
            //     state: 'triangular.admin-default.profile',
            //     type: 'link'
            // }]
        });
    }
})();
