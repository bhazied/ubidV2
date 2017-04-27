'use strict';

/**
 * Controller for Country Details
 */

app.controller('CountryCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$countriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $countriesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.systemsettings.countries');
    };

    $scope.add = function() {
        $state.go('app.systemsettings.countriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.systemsettings.countriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $countriesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.country = data;
        });
    }

}]);

