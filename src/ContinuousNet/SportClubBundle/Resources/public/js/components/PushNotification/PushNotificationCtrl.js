'use strict';

/**
 * Controller for Push Notification Details
 */

app.controller('PushNotificationCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$pushNotificationsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $pushNotificationsDataFactory) {

    $scope.types = [{
        id: 'MatchConfirmed',
        title: $filter('translate')('content.list.fields.types.MATCHCONFIRMED'),
        css: 'primary'
    }, {
        id: '30MinutesBefore',
        title: $filter('translate')('content.list.fields.types.30MINUTESBEFORE'),
        css: 'success'
    }, {
        id: 'LineUpsConfirmed',
        title: $filter('translate')('content.list.fields.types.LINEUPSCONFIRMED'),
        css: 'warning'
    }, {
        id: 'StartHalfTimeFullTime',
        title: $filter('translate')('content.list.fields.types.STARTHALFTIMEFULLTIME'),
        css: 'danger'
    }, {
        id: 'Goals',
        title: $filter('translate')('content.list.fields.types.GOALS'),
        css: 'default'
    }, {
        id: 'Substitutions',
        title: $filter('translate')('content.list.fields.types.SUBSTITUTIONS'),
        css: 'info'
    }, {
        id: 'Promotions',
        title: $filter('translate')('content.list.fields.types.PROMOTIONS'),
        css: 'primary'
    }, {
        id: 'NewPost',
        title: $filter('translate')('content.list.fields.types.NEWPOST'),
        css: 'success'
    }, {
        id: 'NewVideo',
        title: $filter('translate')('content.list.fields.types.NEWVIDEO'),
        css: 'warning'
    }, {
        id: 'NewAudio',
        title: $filter('translate')('content.list.fields.types.NEWAUDIO'),
        css: 'danger'
    }, {
        id: 'NewPhotosGallery',
        title: $filter('translate')('content.list.fields.types.NEWPHOTOSGALLERY'),
        css: 'default'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.mobile.pushnotifications');
    };

    $scope.add = function() {
        $state.go('app.mobile.pushnotificationsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushnotificationsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $pushNotificationsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.pushNotification = data;
        });
    }

}]);

