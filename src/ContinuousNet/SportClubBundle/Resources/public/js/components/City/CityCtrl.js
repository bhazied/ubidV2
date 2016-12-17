'use strict';

/**
 * Controller for City Details
 */

app.controller('CityCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$citiesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $citiesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.settings.cities');
    };

    $scope.add = function() {
        $state.go('app.settings.citiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.citiesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $citiesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.city = data;
        });
    }

}]);

