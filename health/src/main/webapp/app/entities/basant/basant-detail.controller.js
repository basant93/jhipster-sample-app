(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('BasantDetailController', BasantDetailController);

    BasantDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Basant'];

    function BasantDetailController($scope, $rootScope, $stateParams, previousState, entity, Basant) {
        var vm = this;

        vm.basant = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('healthApp:basantUpdate', function(event, result) {
            vm.basant = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
