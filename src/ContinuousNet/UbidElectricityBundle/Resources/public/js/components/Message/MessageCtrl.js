'use strict';

/**
 * Controller for Message Details
 */

app.controller('MessageCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$messagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $messagesDataFactory) {

    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Sent',
        title: $filter('translate')('content.list.fields.statuses.SENT'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.marketplace.messages');
    };

    $scope.add = function() {
        $state.go('app.marketplace.messagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.messagesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $messagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.message = data;
        });
    }

}]);

