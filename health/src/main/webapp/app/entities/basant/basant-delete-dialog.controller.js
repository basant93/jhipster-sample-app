(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('BasantDeleteController',BasantDeleteController);

    BasantDeleteController.$inject = ['$uibModalInstance', 'entity', 'Basant'];

    function BasantDeleteController($uibModalInstance, entity, Basant) {
        var vm = this;

        vm.basant = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Basant.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
