(function() {
    'use strict';

    angular
        .module('app.shopagram.posts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/shopagram/posts');

        $stateProvider
        .state('triangular.admin-default.posts', {
            url: '/posts',
            templateUrl: 'app/shopagram/posts/posts.tmpl.html',
            // set the controller to load for this page
            controller: 'PostsController',
            controllerAs: 'vm',
            resolve: {
                postsResolve: function(AuthService) {
                    return AuthService.fetchInstagram();
                 }
            }
        });

        triMenuProvider.addMenu({
            name: 'MENU.POSTS.POSTS-MODULE',
            state: 'triangular.admin-default.posts',
            icon: 'zmdi zmdi-assignment',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.POSTS.POSTS-PAGE',
                state: 'triangular.admin-default.posts',
                type: 'link'
            },{
                name: 'MENU.PRODUCTS.PRODUCTS-PAGE',
                state: 'triangular.admin-default.products',
                type: 'link'
            }]
        });
    }
})();
