(function() {
    'use strict';

    angular
        .module('app.shopagram.shop')
        .controller('ShopController', ShopController);

    /* @ngInject */
    function ShopController(AuthService, $stateParams) {
        var vm = this;
        
        vm.dummyImg = "../assets/images/avatars/avatar-big.png";
        vm.dummyStoreName = "Store Name Goes Here";
        vm.dummyFacebook = "http://www.facebook.com";
        vm.dummyTwitter = "http://www.twitter.com";
        vm.dummyBio = "This is where you will leave a short description/bio of your store. A good strategy is to put any sales/promotions here";
        vm.dummyWebsite = "http://#.com";
        vm.dummyProducts = {
            product: [vm.dummyImg, vm.dummyImg]
        } 
        
        AuthService.getAuthedUser().then(function(data) {
            vm.authedUser = data.user;
            //vm.authedUser.profile.storeName is what I want to use on the id
        });
        
        AuthService.getProductsForUser($stateParams.id).then(function(response) {
            vm.shopInfo = response;
            vm.shopProducts = response.products;
            console.log("Created Products", vm.shopInfo);
        });
       
    } 
})();
