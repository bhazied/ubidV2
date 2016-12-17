'use strict';

/**
 * Controller for Package Type Details
 */

app.controller('PackageTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$packageTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $packageTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.packagetypes');
    };

    $scope.add = function() {
        $state.go('app.offer.packagetypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.packagetypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $packageTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.packageType = data;
        });
    }

}]);

