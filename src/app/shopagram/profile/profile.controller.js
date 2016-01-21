(function() {
    'use strict';

    angular
        .module('app.shopagram.profile')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(AuthService, $mdToast) {
        var vm = this;
        
        vm.profileSaved = profileSaved;
        
        function profileSaved($event, position) {
            var $button = angular.element($event.currentTarget);
            $mdToast.show({
                template: '<md-toast><span flex>Profile Updated!</span></md-toast>',
                position: position,
                hideDelay: 3000,
                parent: $button.parent()
            });
        }
        
        vm.defaultImg = "../assets/images/avatars/avatar-5.png";
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            vm.profile = vm.authedUser.profile;
            vm.profileImg = vm.authedUser.instagram.profile_picture;
        });
        
        vm.sayLink = function(url) {
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
            }   
            return url;
        };
        
        vm.updateUserProfile = function () {
            // vm.newUserProfile = {
            //     storeName: vm.storeName,
            //     locations: vm.locations,
            //     website: vm.website,
            //     twitter: vm.twitter,
            //     facebook: vm.facebook,
            //     bio: vm.bio
            // };
            vm.profile.website = vm.sayLink(vm.profile.website);
            vm.profile.facebook = vm.sayLink(vm.profile.facebook);
            vm.profile.twitter = vm.sayLink(vm.profile.twitter);
            AuthService.updateUserProfile(vm.profile).then(function(data) {
                console.log(data);
            });
         };
        
    }
})();
