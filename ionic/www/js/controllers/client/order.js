angular.module('starter.controllers') /// estou acessando o modulo starter.controllers ja existente
    .controller('ClientOrderCtrl', [
        '$scope','$state','$ionicLoading', '$ionicActionSheet', 'ClientOrder',
        function ($scope, $state, $ionicLoading, $ionicActionSheet, ClientOrder) {

            $scope.items = [];

            $ionicLoading.show({
                template: 'Carregando...'
            });

            $scope.doRefresh = function(){
                getOrders().then(function (data) {
                    $scope.items = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(dataError){
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.openOrderDetail = function(order){
                $state.go('client.view-order', {id: order.id});
            };

            $scope.showActionSheet = function(order){
                $ionicActionSheet.show({
                    buttons: [
                        {text: 'Ver Detalhes'},
                        {text: 'Ver Entrega'}
                    ],
                    titleText: 'O que fazer?',
                    cancelText: 'Cancelar',
                    cancel:function(){
                        // made something
                    },
                    buttonClicked:function(index){
                        switch (index){
                            case 0:
                                $state.go('client.view-order',{id:order.id});
                                break;
                            case 1:
                                $state.go('client.view-delivery',{id:order.id});
                                break;
                        }
                    }
                });
            };

            function getOrders () {
                return ClientOrder.query({
                    id:null,
                    orderBy: 'created_at',
                    sortedBy: 'desc'
                }).$promise;
            }

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            }, function(dataError){
                $ionicLoading.hide();
            });

        }]);