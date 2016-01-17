(function() {
    'use strict';

    angular
        .module('app.shopagram.posts')
        .controller('PostsController', PostsController);

    /* @ngInject */
    function PostsController($scope, AuthService, postsResolve, $mdDialog, $mdMedia) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            $scope.authedUser = data.user;
            console.log("This is the authedUser ", $scope.authedUser);
        });
        
        $scope.posts = postsResolve;
        console.log($scope.posts);
        
        $scope.addProduct = function(index) {
            console.log($scope.posts[index].image);
            $scope.imageURL = $scope.posts[index].image;
        };
        
        $scope.sayLink = function(url) {
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
            }   
            return url;
        };
        
        $scope.postNewProduct = function () {
            
            $scope.url = $scope.sayLink($scope.url);
            
            var newProduct = {
                user: $scope.authedUser,
                product: $scope.imageURL,
                url: $scope.url
            };
            AuthService.postNewProduct(newProduct)
                .then(function(data) {
                console.log(data);
            });
            $scope.url = '';
        };
        
        $scope.test = "this is a test";
        
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        
         $scope.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            openFrom: "#left",
            templateUrl: 'app/shopagram/posts/postsModal.tmpl.html',
            controller: DialogController,
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
            })
            $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
        
            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
           }
           
            
    }
})();
