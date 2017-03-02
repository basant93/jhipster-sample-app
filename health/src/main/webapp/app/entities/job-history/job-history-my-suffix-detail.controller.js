(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('JobHistoryMySuffixDetailController', JobHistoryMySuffixDetailController);

    JobHistoryMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'JobHistory', 'Job', 'Department', 'Employee'];

    function JobHistoryMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, JobHistory, Job, Department, Employee) {
        var vm = this;

        vm.jobHistory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('healthApp:jobHistoryUpdate', function(event, result) {
            vm.jobHistory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
