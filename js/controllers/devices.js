var controllers = angular.module('controllers');

controllers.controller('devicesController', [
    '$scope', '$timeout', '$filter', '$q', 'Device', 'User', 'Model', 'Producer', 'Room', 'Building',

    function($scope, $timeout, $filter, $q, Device, User, Model, Producer, Room, Building) {
        var defaultItem, tmpItem,
            list, users, models, producers, rooms, buildings;
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
        function resetAddForm() {
            $scope.item = defaultItem;
            $scope.itemStatus = "add";
        }

        function onDataFetchSuccess() {
            $scope.list = list;

            $scope.onDelete = function(index) {
                list.splice(index, 1);
                Device.delete({id: $scope.item.id});
            };
            $scope.onEdit = function(index) {
                tmpItem = list.slice(index, index + 1)[0];
                $scope.item = tmpItem;
                $scope.itemStatus = "update";
            };
            $scope.onEditCancel = function() {
                resetAddForm();
            };
            $scope.onUpdate = function() {
                Device.update({id: $scope.item.id}, $scope.item);
                resetAddForm();
            };
            $scope.onAdd = function() {
                tmpItem = $scope.item;
                delete tmpItem["id"];
                Device.save($scope.item);
                resetAddForm();
            }
        }

        getList()
            .then(getUsers)
            .then(getModels)
            .then(getProducers)
            .then(getRooms)
            .then(getBuildings)
            .then(function() {
                var d = $q.defer();
                $timeout(function () {
                    onDataFetchSuccess();
                    $scope.users = users;
                    $scope.models = models;
                    $scope.producers = producers;
                    $scope.rooms = rooms;
                    $scope.buildings = buildings;
                    resetAddForm();
                    d.resolve();
                }, 0);
                return d.promise;
            });

        function getList() {
            var d = $q.defer();
            Device.query(function (data) {
                list = data;
                d.resolve();
            });
            return d.promise;
        }
        function getUsers() {
            var d = $q.defer();
            User.query(function (data) {
                users = data;
                d.resolve();
            });
            return d.promise;
        }
        function getModels() {
            var d = $q.defer();
            Model.query(function (data) {
                models = data;
                d.resolve();
            });
            return d.promise;
        }
        function getProducers() {
            var d = $q.defer();
            Producer.query(function (data) {
                producers = data;
                d.resolve();
            });
            return d.promise;
        }
        function getRooms() {
            var d = $q.defer();
            Room.query(function (data) {
                rooms = data;
                d.resolve();
            });
            return d.promise;
        }
        function getBuildings() {
            var d = $q.defer();
            Building.query(function (data) {
                buildings = data;
                d.resolve();
            });
            return d.promise;
        }
    }
]);