'use strict';

/**
 * Controller for Bid Details
 */

app.controller('MyBidCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bidsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bidsDataFactory) {

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
    }, {
        id: 'Selected',
        title: $filter('translate')('content.list.fields.statuses.SELECTED'),
        css: 'primary'
    }, {
        id: 'Rejected',
        title: $filter('translate')('content.list.fields.statuses.REJECTED'),
        css: 'success'
    }, {
        id: 'Shortlisted',
        title: $filter('translate')('content.list.fields.statuses.SHORTLISTED'),
        css: 'warning'
    }, {
        id: 'Qualified',
        title: $filter('translate')('content.list.fields.statuses.QUALIFIED'),
        css: 'danger'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('front.mybids.list');
    };

    $scope.add = function() {
        $state.go('front.mybids.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mybids.edit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $bidsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.bid = data;
        });
    }

}]);

