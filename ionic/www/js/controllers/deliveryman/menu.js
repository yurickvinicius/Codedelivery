angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('DeliverymanMenuCtrl', [
        '$scope', 'UserData',
        function ($scope, UserData) {

            $scope.user = UserData.get();

        }]);