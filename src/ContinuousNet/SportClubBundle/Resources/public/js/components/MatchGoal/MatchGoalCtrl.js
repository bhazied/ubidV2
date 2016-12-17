'use strict';

/**
 * Controller for Match Goal Details
 */

app.controller('MatchGoalCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$matchGoalsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $matchGoalsDataFactory) {

    $scope.scoredWiths = [{
        id: 'LeftFoot',
        title: $filter('translate')('content.list.fields.scoredwiths.LEFTFOOT'),
        css: 'primary'
    }, {
        id: 'RightFoot',
        title: $filter('translate')('content.list.fields.scoredwiths.RIGHTFOOT'),
        css: 'success'
    }, {
        id: 'Head',
        title: $filter('translate')('content.list.fields.scoredwiths.HEAD'),
        css: 'warning'
    }];
    $scope.zones = [{
        id: 'TopLeft',
        title: $filter('translate')('content.list.fields.zones.TOPLEFT'),
        css: 'primary'
    }, {
        id: 'TopCenter',
        title: $filter('translate')('content.list.fields.zones.TOPCENTER'),
        css: 'success'
    }, {
        id: 'TopRight',
        title: $filter('translate')('content.list.fields.zones.TOPRIGHT'),
        css: 'warning'
    }, {
        id: 'BottomLeft',
        title: $filter('translate')('content.list.fields.zones.BOTTOMLEFT'),
        css: 'danger'
    }, {
        id: 'BottomCenter',
        title: $filter('translate')('content.list.fields.zones.BOTTOMCENTER'),
        css: 'default'
    }, {
        id: 'BottomRight',
        title: $filter('translate')('content.list.fields.zones.BOTTOMRIGHT'),
        css: 'info'
    }];
    $scope.stadiumZones = [{
        id: 'OutsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.OUTSIDEBOX'),
        css: 'primary'
    }, {
        id: 'InsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.INSIDEBOX'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.matchday.matchgoals');
    };

    $scope.add = function() {
        $state.go('app.matchday.matchgoalsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchgoalsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $matchGoalsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.matchGoal = data;
        });
    }

}]);

