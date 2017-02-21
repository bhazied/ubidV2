'use strict';

/**
 * Controller for Supplier Details
 */

app.controller('SupplierCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$suppliersDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $suppliersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.marketplace.suppliers');
    };

    $scope.add = function() {
        $state.go('app.marketplace.suppliersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.suppliersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $suppliersDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.supplier = data;
        });
    }

}]);

