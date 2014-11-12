var services = angular.module('services');

services.factory('Producer', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbproducer/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })
}]);