(function() {
    'use strict';

    angular
        .module('healthApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('basant', {
            parent: 'entity',
            url: '/basant',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Basants'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/basant/basants.html',
                    controller: 'BasantController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('basant-detail', {
            parent: 'basant',
            url: '/basant/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Basant'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/basant/basant-detail.html',
                    controller: 'BasantDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Basant', function($stateParams, Basant) {
                    return Basant.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'basant',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('basant-detail.edit', {
            parent: 'basant-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/basant/basant-dialog.html',
                    controller: 'BasantDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Basant', function(Basant) {
                            return Basant.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('basant.new', {
            parent: 'basant',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/basant/basant-dialog.html',
                    controller: 'BasantDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                position: null,
                                role: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('basant', null, { reload: 'basant' });
                }, function() {
                    $state.go('basant');
                });
            }]
        })
        .state('basant.edit', {
            parent: 'basant',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/basant/basant-dialog.html',
                    controller: 'BasantDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Basant', function(Basant) {
                            return Basant.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('basant', null, { reload: 'basant' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('basant.delete', {
            parent: 'basant',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/basant/basant-delete-dialog.html',
                    controller: 'BasantDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Basant', function(Basant) {
                            return Basant.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('basant', null, { reload: 'basant' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
