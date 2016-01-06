(function() {
    'use strict';

    angular
        .module('app.shopagram.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
