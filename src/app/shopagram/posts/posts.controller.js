(function() {
    'use strict';

    angular
        .module('app.shopagram.posts')
        .controller('PostsController', PostsController);

    /* @ngInject */
    function PostsController($scope, AuthService, postsResolve, $mdDialog, $mdMedia, $mdToast) {
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
        
        vm.productAddedToast = productAddedToast;
        
        function productAddedToast($event, position) {
            var $button = angular.element($event.currentTarget);
            $mdToast.show({
                template: '<md-toast><span flex>Profile Updated!</span></md-toast>',
                position: position,
                hideDelay: 3000,
                parent: $button.parent()
            });
        }
        
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
