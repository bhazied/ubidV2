'use strict';

/**
 * Controller for Package Details
 */

app.controller('PackageCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$packagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $packagesDataFactory) {

    $scope.modes = [{
        id: 'Product',
        title: $filter('translate')('content.list.fields.modes.PRODUCT'),
        css: 'primary'
    }, {
        id: 'Subscription',
        title: $filter('translate')('content.list.fields.modes.SUBSCRIPTION'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.packages');
    };

    $scope.add = function() {
        $state.go('app.offer.packagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.packagesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $packagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.package = data;
        });
    }

}]);

