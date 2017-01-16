'use strict';

/**
 * Controller for User Setting Details
 */

app.controller('UserSettingCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$userSettingsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $userSettingsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.access.usersettings');
    };

    $scope.add = function() {
        $state.go('app.access.usersettingsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.usersettingsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $userSettingsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.userSetting = data;
        });
    }

}]);

