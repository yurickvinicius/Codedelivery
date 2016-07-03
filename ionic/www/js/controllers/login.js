angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('LoginCtrl', [
        '$scope','OAuth','$ionicPopup','$state', function ($scope, OAuth, $ionicPopup, $state) {

        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function () {
            OAuth.getAccessToken($scope.user).then(function (data) {
                $state.go('home');
            }, function (responseError) {
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Login e/ou senha inválidos'
                });
                console.debug(responseError);
            });
        }
    }]);