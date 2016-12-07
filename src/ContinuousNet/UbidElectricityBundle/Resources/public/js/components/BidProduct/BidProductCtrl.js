'use strict';

/**
 * Controller for Bid Product Details
 */

app.controller('BidProductCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bidProductsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bidProductsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.marketplace.bidproducts');
    };

    $scope.add = function() {
        $state.go('app.marketplace.bidproductsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.bidproductsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $bidProductsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.bidProduct = data;
        });
    }

}]);

