'use strict';

/**
 * Controller for Voucher Details
 */

app.controller('VoucherCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$vouchersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $vouchersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.vouchers');
    };

    $scope.add = function() {
        $state.go('app.offer.vouchersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.vouchersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $vouchersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.voucher = data;
        });
    }

}]);

