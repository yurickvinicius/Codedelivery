angular.module('starter.controllers') 
    .controller('ClientViewDeliveryCtrl', [
        '$scope','$stateParams','ClientOrder','$ionicLoading','$ionicPopup','UserData',
        function ($scope, $stateParams, ClientOrder, $ionicLoading, $ionicPopup, UserData) {
            var iconUrl = 'http://maps.google.com/mapfiles/kml/pal3';
            $scope.order = {};
            $scope.map = {
                center: {
                    latitude: -23.444,
                    longitude: -46.444
                },
                zoom: 12
            };

            $scope.markers = [];

            $ionicLoading.show({
                template: 'Carregando...'
            });

            ClientOrder.get({id: $stateParams.id, include: "items,cupom"}, function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
                if(parseInt($scope.order.status, 10) == 1){
                    initMarkers();
                }else{
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Pedido não esta em status de entrega'
                    });
                }
            }, function(dataError){
                $ionicLoading.hide();
            });

            $scope.addItem = function (item){
                item.qtd = 1;
                $cart.addItem(item);
                $state.go('client.checkout');
            };

            function initMarkers(){

                var client = UserData.get().client.data,
                    address = client.zipcode + ', ' +
                        client.address + ', ' +
                        client.city + ' - ' +
                        client.state;
                createMarkerClient(address);
            }

            function createMarkerClient(address){
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                },function(results, status){

                    if(status == google.maps.GeocoderStatus.OK){
                        var lat = results[0].geometry.location.lat(),
                            long = results[0].geometry.location.lng();

                        $scope.markers.push({
                            id: 'client',
                            coords: {
                                latitude: lat,
                                longitude: long
                            },
                            options: {
                                title: 'Local de entrega',
                                icon: iconUrl + '/icon23.png'
                            }
                        });
                    }else{
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Não foi possivel encontrar seu endereço!'
                        });
                    }
                })
            }

        }]);