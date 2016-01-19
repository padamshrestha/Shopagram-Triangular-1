(function() {
    'use strict';

    angular
        .module('app.shopagram.profile')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(AuthService) {
        var vm = this;
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            console.log("This is the authedUser ", vm.authedUser);
            vm.profile = vm.authedUser.profile;
            console.log("this is the profile", vm.profile);
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
            AuthService.updateUserProfile(vm.profile).then(function(data) {
                console.log(data);
            });
         };
        
    }
})();
