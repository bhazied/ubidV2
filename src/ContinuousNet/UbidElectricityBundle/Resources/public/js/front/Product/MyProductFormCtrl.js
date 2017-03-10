'use strict';

/**
 * Controller for Supplier Product Form
 */

app.controller('MyProductFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$suppliersDataFactory', '$categoriesDataFactory', '$usersDataFactory', '$supplierProductsDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $suppliersDataFactory, $categoriesDataFactory, $usersDataFactory, $supplierProductsDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    },1500);

    angular.extend(this, $controller('SupplierProductFormCtrl', {$scope:$scope}));

    $scope.enableFormAlert = false;

    $scope.list = function() {
        $state.go('front.myproducts.list');
    };

}]);

