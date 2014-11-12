var services = angular.module('services');

services.factory('Room', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbroom/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })
}]);