(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('BasantController', BasantController);

    BasantController.$inject = ['Basant'];

    function BasantController(Basant) {

        var vm = this;

        vm.basants = [];

        loadAll();

        function loadAll() {
            Basant.query(function(result) {
                vm.basants = result;
                vm.searchQuery = null;
            });
        }
    }
})();
