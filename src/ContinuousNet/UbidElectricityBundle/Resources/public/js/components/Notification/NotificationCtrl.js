'use strict';

/**
 * Controller for Notification Details
 */

app.controller('NotificationCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$notificationsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $notificationsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.access.notifications');
    };

    $scope.add = function() {
        $state.go('app.access.notificationsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.notificationsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $notificationsDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.notification = data;
        });
    }

}]);

