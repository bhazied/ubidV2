'use strict';

/**
 * Controller for Team Details
 */

app.controller('TeamCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$teamsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $teamsDataFactory) {

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
        $state.go('app.events.teams');
    };

    $scope.add = function() {
        $state.go('app.events.teamsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.teamsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $teamsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.team = data;
        });
    }

}]);

