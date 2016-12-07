'use strict';

/**
 * Controller for Product Type Details
 */

app.controller('ProductTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$productTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $productTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.nogroup.producttypes');
    };

    $scope.add = function() {
        $state.go('app.nogroup.producttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.nogroup.producttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $productTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.productType = data;
        });
    }

}]);

