var controllers = angular.module('controllers');

controllers.controller('devicesController', [
    '$scope', 'Device',

    function($scope, Device) {
        var data = Device.query();

        $scope.devices = data;
    }
]);

controllers.controller('deviceController', ['$scope', '$routeParams', 'Device', function($scope, $routeParams, Device) {
    $scope.id = $routeParams.id;
    //$scope.data = Device.query();
}]);
