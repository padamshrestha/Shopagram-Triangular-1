(function() {
    'use strict';

    angular
        .module('app.shopagram.products')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/shopagram/products');

        $stateProvider
        .state('triangular.admin-default.products', {
            url: '/products',
            templateUrl: 'app/shopagram/products/products.tmpl.html',
            // set the controller to load for this page
            controller: 'ProductsController',
            controllerAs: 'vm'
        });

        // triMenuProvider.addMenu({
        //     name: 'MENU.PRODUCTS.PRODUCTS-MODULE',
        //     state: 'triangular.admin-default.products',
        //     icon: 'zmdi zmdi-account',
        //     type: 'dropdown',
        //     priority: 1.1,
        //     children: [{
        //         name: 'MENU.PRODUCTS.PRODUCTS-PAGE',
        //         state: 'triangular.admin-default.products',
        //         type: 'link'
        //     }]
        // });
    }
})();
