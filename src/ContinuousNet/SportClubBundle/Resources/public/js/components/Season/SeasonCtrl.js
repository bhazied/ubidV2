'use strict';

/**
 * Controller for Season Details
 */

app.controller('SeasonCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$seasonsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $seasonsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.seasons');
    };

    $scope.add = function() {
        $state.go('app.events.seasonsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.seasonsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $seasonsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.season = data;
        });
    }

}]);

