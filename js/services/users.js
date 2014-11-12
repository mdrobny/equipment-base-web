var services = angular.module('services');

services.factory('User', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbuser/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })
}]);