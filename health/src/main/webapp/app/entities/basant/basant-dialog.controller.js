(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('BasantDialogController', BasantDialogController);

    BasantDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Basant'];

    function BasantDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Basant) {
        var vm = this;

        vm.basant = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.basant.id !== null) {
                Basant.update(vm.basant, onSaveSuccess, onSaveError);
            } else {
                Basant.save(vm.basant, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('healthApp:basantUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
