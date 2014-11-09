var services = angular.module('services');

services.factory('Device', ['$resource', 'config', function ($resource, config) {
    return $resource(config.apiUrl +'dbdevice', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: true
        }
    })
}]);