angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('ClientMenuCtrl', [
        '$scope', 'UserData',
        function ($scope, UserData) {

            $scope.user = UserData.get();

        }]);