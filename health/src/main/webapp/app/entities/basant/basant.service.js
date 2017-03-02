(function() {
    'use strict';
    angular
        .module('healthApp')
        .factory('Basant', Basant);

    Basant.$inject = ['$resource'];

    function Basant ($resource) {
        var resourceUrl =  'api/basants/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
