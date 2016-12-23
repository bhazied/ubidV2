'use strict';

/**
 * Controller for Supplier Products List
 */

app.controller('MyProductsCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$suppliersDataFactory', '$categoriesDataFactory', '$usersDataFactory', '$supplierProductsDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $suppliersDataFactory, $categoriesDataFactory, $usersDataFactory, $supplierProductsDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('SupplierProductsCtrl', {$scope:$scope}));

    $scope.add = function() {
        $state.go('front.myproducts.new');
    };

    $scope.edit = function(row) {
        $state.go('front.myproducts.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.myproducts.details', {id: row.id});
    };

}]);

