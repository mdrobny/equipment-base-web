var app = angular.module('app', [
    'ngRoute', 'controllers', 'services'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/devices', {
            templateUrl: 'templates/devices.html',
            controller: 'devicesController'
        }).
        otherwise({
            redirectTo: '/devices'
        });
}]);

angular.module('config', []).constant('config', {
    apiUrl: 'http://localhost:8080/equipment-base/webresources/'
});
angular.module('controllers', ['datatables']);
angular.module('services', ['ngResource', 'config']);