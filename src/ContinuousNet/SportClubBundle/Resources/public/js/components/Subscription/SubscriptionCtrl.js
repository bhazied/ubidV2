'use strict';

/**
 * Controller for Subscription Details
 */

app.controller('SubscriptionCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$subscriptionsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $subscriptionsDataFactory) {

    $scope.statuses = [{
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.statuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'PaymentSuccess',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTSUCCESS'),
        css: 'success'
    }, {
        id: 'PaymentFailed',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTFAILED'),
        css: 'warning'
    }, {
        id: 'DeliveredSuccess',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDSUCCESS'),
        css: 'danger'
    }, {
        id: 'DeliveredFailed',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDFAILED'),
        css: 'default'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.subscriptions');
    };

    $scope.add = function() {
        $state.go('app.offer.subscriptionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.subscriptionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $subscriptionsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.subscription = data;
        });
    }

}]);

