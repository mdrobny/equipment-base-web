var services = angular.module('services');

services.factory('Model', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbmodel/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })
}]);