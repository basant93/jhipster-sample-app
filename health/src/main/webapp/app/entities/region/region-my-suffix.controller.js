(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('RegionMySuffixController', RegionMySuffixController);

    RegionMySuffixController.$inject = ['Region'];

    function RegionMySuffixController(Region) {

        var vm = this;

        vm.regions = [];

        loadAll();

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
