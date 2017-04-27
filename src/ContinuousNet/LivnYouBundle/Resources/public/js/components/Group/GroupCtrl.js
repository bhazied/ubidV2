'use strict';

/**
 * Controller for Group Details
 */

app.controller('GroupCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$groupsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $groupsDataFactory) {

    $scope.roles = [{
        id: 'ROLE_API',
        title: $filter('translate')('content.list.fields.roles.ROLE_API'),
        css: 'primary'
    }, {
        id: 'ROLE_ACCOUNT_MANAGER',
        title: $filter('translate')('content.list.fields.roles.ROLE_ACCOUNT_MANAGER'),
        css: 'success'
    }, {
        id: 'ROLE_ACCOUNT_USER',
        title: $filter('translate')('content.list.fields.roles.ROLE_ACCOUNT_USER'),
        css: 'warning'
    }, {
        id: 'ROLE_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_ADMIN'),
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
        $state.go('app.accesscontrol.groups');
    };

    $scope.add = function() {
        $state.go('app.accesscontrol.groupsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.accesscontrol.groupsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $groupsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.group = data;
        });
    }

}]);

