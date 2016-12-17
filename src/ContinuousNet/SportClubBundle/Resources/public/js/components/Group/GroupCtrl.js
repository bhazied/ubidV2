'use strict';

/**
 * Controller for Group Details
 */

app.controller('GroupCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$groupsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $groupsDataFactory) {

    $scope.roles = [{
        id: 'ROLE_API',
        title: $filter('translate')('content.list.fields.roles.ROLE_API'),
        css: 'primary'
    }, {
        id: 'ROLE_SUBSCRIBER',
        title: $filter('translate')('content.list.fields.roles.ROLE_SUBSCRIBER'),
        css: 'success'
    }, {
        id: 'ROLE_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_ADMIN'),
        css: 'warning'
    }, {
        id: 'ROLE_ADMIN_PUBLISHER',
        title: $filter('translate')('content.list.fields.roles.ROLE_ADMIN_PUBLISHER'),
        css: 'danger'
    }, {
        id: 'ROLE_SUPER_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_SUPER_ADMIN'),
        css: 'default'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.access.groups');
    };

    $scope.add = function() {
        $state.go('app.access.groupsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.groupsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $groupsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.group = data;
        });
    }

}]);

