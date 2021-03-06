'use strict';

/**
 * Controller for Supplier Type Details
 */

app.controller('SupplierTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$supplierTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $supplierTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.lists.suppliertypes');
    };

    $scope.add = function() {
        $state.go('app.lists.suppliertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.suppliertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $supplierTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.supplierType = data;
        });
    }

}]);

