'use strict';

/**
 * Controller for Stat Details
 */

app.controller('StatCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$statsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $statsDataFactory) {

    $scope.mouvements = [{
        id: 'None',
        title: $filter('translate')('content.list.fields.mouvements.NONE'),
        css: 'primary'
    }, {
        id: 'Up',
        title: $filter('translate')('content.list.fields.mouvements.UP'),
        css: 'success'
    }, {
        id: 'Down',
        title: $filter('translate')('content.list.fields.mouvements.DOWN'),
        css: 'warning'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.stats');
    };

    $scope.add = function() {
        $state.go('app.events.statsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.statsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $statsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.stat = data;
        });
    }

}]);

