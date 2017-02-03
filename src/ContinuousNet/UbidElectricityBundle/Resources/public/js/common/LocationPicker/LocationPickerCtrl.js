'use strict';

/**
 * Location Picker Modal Controller
 */

app.controller('LocationPickerCtrl', ['$scope', '$localStorage', '$timeout', '$uibModalInstance', 'field', 'value',
    function ($scope, $localStorage, $timeout, $uibModalInstance, field, value) {

        $scope.field = field;
        $scope.value = value;
        $scope.latitude = 35.86841427230919;
        $scope.longitude = 10.57455518203119;
        $scope.radius = 100;

        $timeout(function(){
            if ($scope.value != '' && typeof $scope.value != 'undefined') {
                var parts = $scope.value.split('|');
                $scope.latitude = parts[0];
                $scope.longitude = parts[1];
                $scope.radius = parts[2];
            }

            var locationPicker = $('#locationpicker_'+$scope.field).locationpicker({
                location: {
                    latitude: $scope.latitude,
                    longitude: $scope.longitude
                },
                radius: $scope.radius,
                inputBinding: {
                    latitudeInput: $('#latitude_'+$scope.field),
                    longitudeInput: $('#longitude_'+$scope.field),
                    radiusInput: $('#radius_'+$scope.field),
                    locationNameInput: $('#address_'+$scope.field)
                },
                enableAutocomplete: true,
                onchanged: function (currentLocation, radius, isMarkerDropped) {
                    //$scope.latitude = currentLocation.latitude;
                    //$scope.longitude = currentLocation.longitude;
                }
            });

        }, 500);

        $scope.ok = function () {
            $uibModalInstance.close($scope.latitude+'|'+$scope.longitude+'|'+$scope.radius);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);
