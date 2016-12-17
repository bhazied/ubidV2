'use strict';

/**
 * Controller for Push Message Details
 */

app.controller('PushMessageCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$pushMessagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $pushMessagesDataFactory) {

    $scope.sendingStatuses = [{
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.sendingstatuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'Queued',
        title: $filter('translate')('content.list.fields.sendingstatuses.QUEUED'),
        css: 'success'
    }, {
        id: 'Delivered',
        title: $filter('translate')('content.list.fields.sendingstatuses.DELIVERED'),
        css: 'warning'
    }, {
        id: 'Failed',
        title: $filter('translate')('content.list.fields.sendingstatuses.FAILED'),
        css: 'danger'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.mobile.pushmessages');
    };

    $scope.add = function() {
        $state.go('app.mobile.pushmessagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushmessagesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $pushMessagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.pushMessage = data;
        });
    }

}]);

