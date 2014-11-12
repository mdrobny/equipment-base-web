var services = angular.module('services');

services.factory('Building', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbbuilding/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })
}]);