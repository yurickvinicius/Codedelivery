angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('ClientViewOrderCtrl', [
        '$scope','$stateParams','ClientOrder','$ionicLoading',
        function ($scope, $stateParams, ClientOrder, $ionicLoading) {

            $scope.order = {};

            $ionicLoading.show({
                template: 'Carregando...'
            });

            ClientOrder.get({id: $stateParams.id, include: "items,cupom"}, function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
            }, function(dataError){
                $ionicLoading.hide();
            });

            $scope.addItem = function (item){
                item.qtd = 1;
                $cart.addItem(item);
                $state.go('client.checkout');
            };

        }]);