'use strict';

/**
 * Controller for Player Stat Details
 */

app.controller('PlayerStatCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$playerStatsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $playerStatsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.playerstats');
    };

    $scope.add = function() {
        $state.go('app.events.playerstatsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.playerstatsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $playerStatsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.playerStat = data;
        });
    }

}]);

