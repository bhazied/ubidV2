'use strict';

/**
 * Controller for Push Device Details
 */

app.controller('PushDeviceCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$pushDevicesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $pushDevicesDataFactory) {

    $scope.developments = [{
        id: 'Production',
        title: $filter('translate')('content.list.fields.developments.PRODUCTION'),
        css: 'primary'
    }, {
        id: 'Sandbox',
        title: $filter('translate')('content.list.fields.developments.SANDBOX'),
        css: 'success'
    }];
    $scope.statuses = [{
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Uninstalled',
        title: $filter('translate')('content.list.fields.statuses.UNINSTALLED'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.mobile.pushdevices');
    };

    $scope.add = function() {
        $state.go('app.mobile.pushdevicesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushdevicesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $pushDevicesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.pushDevice = data;
        });
    }

}]);

