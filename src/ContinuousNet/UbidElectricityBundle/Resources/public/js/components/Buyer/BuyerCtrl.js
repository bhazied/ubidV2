'use strict';

/**
 * Controller for Buyer Details
 */

app.controller('BuyerCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$buyersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $buyersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.marketplace.buyers');
    };

    $scope.add = function() {
        $state.go('app.marketplace.buyersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.buyersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $buyersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.buyer = data;
        });
    }

}]);

