'use strict';

/**
 * Controller for Sport Event Details
 */

app.controller('SportEventCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$sportEventsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $sportEventsDataFactory) {

    $scope.teamTypes = [{
        id: 'Club',
        title: $filter('translate')('content.list.fields.teamtypes.CLUB'),
        css: 'primary'
    }, {
        id: 'National',
        title: $filter('translate')('content.list.fields.teamtypes.NATIONAL'),
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
        $state.go('app.events.sportevents');
    };

    $scope.add = function() {
        $state.go('app.events.sporteventsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.sporteventsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $sportEventsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.sportEvent = data;
        });
    }

}]);

