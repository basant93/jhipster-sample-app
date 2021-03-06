(function() {
    'use strict';

    angular
        .module('healthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('department-my-suffix', {
            parent: 'entity',
            url: '/department-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Departments'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departmentsmySuffix.html',
                    controller: 'DepartmentMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('department-my-suffix-detail', {
            parent: 'department-my-suffix',
            url: '/department-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Department'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/department-my-suffix-detail.html',
                    controller: 'DepartmentMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'department-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('department-my-suffix-detail.edit', {
            parent: 'department-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-my-suffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department-my-suffix.new', {
            parent: 'department-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-my-suffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                departmentName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('department-my-suffix', null, { reload: 'department-my-suffix' });
                }, function() {
                    $state.go('department-my-suffix');
                });
            }]
        })
        .state('department-my-suffix.edit', {
            parent: 'department-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-my-suffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department-my-suffix', null, { reload: 'department-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department-my-suffix.delete', {
            parent: 'department-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-my-suffix-delete-dialog.html',
                    controller: 'DepartmentMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department-my-suffix', null, { reload: 'department-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
