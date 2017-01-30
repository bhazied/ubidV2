'use strict';

/**
 * Controller for Alert Details
 */

app.controller('AlertCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$alertsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $alertsDataFactory) {

    $scope.types = [{
        id: 'Tender',
        title: $filter('translate')('content.list.fields.types.TENDER'),
        css: 'primary'
    }, {
        id: 'Consultation',
        title: $filter('translate')('content.list.fields.types.CONSULTATION'),
        css: 'success'
    }, {
        id: 'SupplierAndBuyer',
        title: $filter('translate')('content.list.fields.types.SUPPLIERANDBUYER'),
        css: 'warning'
    }];
    $scope.statuses = [{
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Inactive',
        title: $filter('translate')('content.list.fields.statuses.INACTIVE'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.access.alerts');
    };

    $scope.add = function() {
        $state.go('app.access.alertsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.alertsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $alertsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.alert = data;
        });
    }

}]);

