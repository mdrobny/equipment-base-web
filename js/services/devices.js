var services = angular.module('services');

services.factory('Device', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbdevice/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        },
        update: {
            method: 'PUT'
        }
    })
}]);