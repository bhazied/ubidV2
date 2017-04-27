'use strict';

/**
 * Controller for User Details
 */

app.controller('UserCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$usersDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $usersDataFactory) {

    $scope.types = [{
        id: 'User',
        title: $filter('translate')('content.list.fields.types.USER'),
        css: 'primary'
    }, {
        id: 'Manager',
        title: $filter('translate')('content.list.fields.types.MANAGER'),
        css: 'success'
    }, {
        id: 'Administrator',
        title: $filter('translate')('content.list.fields.types.ADMINISTRATOR'),
        css: 'warning'
    }];
    $scope.genders = [{
        id: 'Male',
        title: $filter('translate')('content.list.fields.genders.MALE'),
        css: 'primary'
    }, {
        id: 'Female',
        title: $filter('translate')('content.list.fields.genders.FEMALE'),
        css: 'success'
    }];
    $scope.authenticationModes = [{
        id: 'Database',
        title: $filter('translate')('content.list.fields.authenticationmodes.DATABASE'),
        css: 'primary'
    }, {
        id: 'ActiveDirectory',
        title: $filter('translate')('content.list.fields.authenticationmodes.ACTIVEDIRECTORY'),
        css: 'success'
    }, {
        id: 'Webservice',
        title: $filter('translate')('content.list.fields.authenticationmodes.WEBSERVICE'),
        css: 'warning'
    }];
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
        $state.go('app.accesscontrol.users');
    };

    $scope.add = function() {
        $state.go('app.accesscontrol.usersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.accesscontrol.usersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $usersDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.user = data;
        });
    }

}]);

