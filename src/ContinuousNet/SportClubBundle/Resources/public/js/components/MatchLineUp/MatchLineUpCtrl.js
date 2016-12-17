'use strict';

/**
 * Controller for Match Line Up Details
 */

app.controller('MatchLineUpCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$matchLineUpsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $matchLineUpsDataFactory) {

    $scope.lineUpTypes = [{
        id: 'Starter',
        title: $filter('translate')('content.list.fields.lineuptypes.STARTER'),
        css: 'primary'
    }, {
        id: 'Substitute',
        title: $filter('translate')('content.list.fields.lineuptypes.SUBSTITUTE'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.matchday.matchlineups');
    };

    $scope.add = function() {
        $state.go('app.matchday.matchlineupsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchlineupsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $matchLineUpsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.matchLineUp = data;
        });
    }

}]);

