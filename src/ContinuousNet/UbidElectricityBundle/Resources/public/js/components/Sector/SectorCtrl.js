'use strict';

/**
 * Controller for Sector Details
 */

app.controller('SectorCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$sectorsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $sectorsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.lists.sectors');
    };

    $scope.add = function() {
        $state.go('app.lists.sectorsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.sectorsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $sectorsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.sector = data;
        });
    }

}]);

