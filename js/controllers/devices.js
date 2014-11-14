var controllers = angular.module('controllers');

controllers.controller('devicesController', [
    '$scope', '$timeout', '$filter', '$q', 'Device', 'User', 'Model', 'Producer', 'Room', 'Building',

    function($scope, $timeout, $filter, $q, Device, User, Model, Producer, Room, Building) {
        var defaultItem, editedItemIndex = -1,
            list, users, models, producers, rooms, buildings;

        function resetAddForm() {
            $scope.item = defaultItem;
            $scope.itemStatus = "add";
            editedItemIndex = -1;
        }

        function onDataFetchSuccess() {
            $scope.list = list;

            $scope.onDelete = function(index) {
                var item = list.splice(index, 1)[0];
                Device.delete({id: item.id});
            };
            /** Removes element from list **/
            $scope.onEdit = function(index) {
                editedItemIndex = index;
                $scope.item = list.slice(index, index + 1)[0];
                $scope.itemStatus = "update";
                angular.element('.select-1').focus();
            };
            $scope.onEditCancel = function() {
                resetAddForm();
            };
            $scope.onUpdate = function() {
                Device.update({id: $scope.item.id}, $scope.item);
                $scope.list[editedItemIndex] = $scope.item;
                resetAddForm();
            };
            $scope.onAdd = function() {
                var itemClone = angular.copy($scope.item),
                    tmpItem = $scope.item;
                delete tmpItem["id"];
                Device.save(tmpItem);
                $scope.list.push(itemClone);
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
                    defaultItem = {
                        model: models[0],
                        owner: users[0],
                        room: rooms[0],
                        securityLevel: 1
                    };
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