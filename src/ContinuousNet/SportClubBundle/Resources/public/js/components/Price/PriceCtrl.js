'use strict';

/**
 * Controller for Price Details
 */

app.controller('PriceCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$pricesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $pricesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.prices');
    };

    $scope.add = function() {
        $state.go('app.offer.pricesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.pricesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $pricesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.price = data;
        });
    }

}]);

