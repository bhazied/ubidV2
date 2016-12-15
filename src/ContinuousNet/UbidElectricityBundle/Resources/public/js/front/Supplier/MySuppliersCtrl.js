'use strict';

/**
 * Controller for Suppliers List
 */

app.controller('MySuppliersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$suppliersDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $suppliersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('SuppliersCtrl', {$scope:$scope}));

    $scope.add = function() {
        $state.go('front.mysuppliers.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mysuppliers.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mysuppliers.details', {id: row.id});
    };
    
}]);

