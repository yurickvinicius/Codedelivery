angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('ClientCheckoutSuccessful', [
        '$scope','$state','$cart',
        function ($scope, $state, $cart) {

            var cart = $cart.get();
            $scope.items = cart.items;
            $scope.total = cart.total;

            $cart.clear();
            
            $scope.openListOrder = function () {
                
            }

        }]);