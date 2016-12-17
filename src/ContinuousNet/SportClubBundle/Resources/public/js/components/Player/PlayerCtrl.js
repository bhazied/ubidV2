'use strict';

/**
 * Controller for Player Details
 */

app.controller('PlayerCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$playersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $playersDataFactory) {

    $scope.positions = [{
        id: 'Forward',
        title: $filter('translate')('content.list.fields.positions.FORWARD'),
        css: 'primary'
    }, {
        id: 'Midfielder',
        title: $filter('translate')('content.list.fields.positions.MIDFIELDER'),
        css: 'success'
    }, {
        id: 'Defender',
        title: $filter('translate')('content.list.fields.positions.DEFENDER'),
        css: 'warning'
    }, {
        id: 'GoalKeeper',
        title: $filter('translate')('content.list.fields.positions.GOALKEEPER'),
        css: 'danger'
    }];
    $scope.writingHands = [{
        id: 'Right',
        title: $filter('translate')('content.list.fields.writinghands.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.writinghands.LEFT'),
        css: 'success'
    }];
    $scope.strongerFoots = [{
        id: 'Right',
        title: $filter('translate')('content.list.fields.strongerfoots.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.strongerfoots.LEFT'),
        css: 'success'
    }];
    $scope.maritalStatuses = [{
        id: 'Single',
        title: $filter('translate')('content.list.fields.maritalstatuses.SINGLE'),
        css: 'primary'
    }, {
        id: 'Married',
        title: $filter('translate')('content.list.fields.maritalstatuses.MARRIED'),
        css: 'success'
    }];
    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.players');
    };

    $scope.add = function() {
        $state.go('app.events.playersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.playersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $playersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.player = data;
        });
    }

}]);

