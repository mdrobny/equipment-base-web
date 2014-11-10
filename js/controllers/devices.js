var controllers = angular.module('controllers');

controllers.controller('devicesController', [
    '$scope', 'Device', '$timeout',

    function($scope, Device, $timeout) {
        var defaultItem, tmpItem;
        defaultItem = {
            "id": "",
            "model": {
                "id": 10,
                "name": "cubilia",
                "producer": {
                    "id": 5,
                    "name": "Voonyx"
                }
            },
            "owner": {
                "firstName": "Evelyn",
                "id": 22,
                "lastName": "Barnes",
                "login": "ebarnesl",
                "securityLevel": 3
            },
            "room": {
                "building": {
                    "id": 2,
                    "name": "D2"
                },
                "id": 4,
                "name": "3"
            },
            "securityLevel": 2
        };
        $scope.item = defaultItem;
        $scope.itemStatus = "add";

        function onDataFetchSuccess(data) {
            $scope.list = data;

            $scope.onDelete = function(index) {
                data.splice(index, 1);
            };
            $scope.onEdit = function(index) {
                tmpItem = data.slice(index, index + 1);
                $scope.item = tmpItem[0];
                $scope.itemStatus = "update";
            };
            $scope.onEditCancel = function() {
                $scope.item = defaultItem;
                $scope.itemStatus = "add";
            };
            $scope.onSubmit = function() {
                if($scope.itemStatus === "add") {
                    tmpItem = $scope.item;
                    delete tmpItem["id"];
                    console.log($scope.item);
                    Device.save($scope.item);
                } else if($scope.itemStatus === "update") {
                    Device.update({id: $scope.item.id}, $scope.item);
                }
                $scope.itemStatus = "add";
                $scope.item = defaultItem;
            }
        }

        Device.query(function (data) {
            $timeout(function () {
                onDataFetchSuccess(data);
            }, 0);
        });
    }
]);