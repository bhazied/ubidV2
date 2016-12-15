'use strict';

/**
 * Controller for Supplier Details
 */

app.controller('MySupplierCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$suppliersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $suppliersDataFactory) {


    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('SupplierCtrl', {$scope:$scope}));

    $scope.list = function() {
        $state.go('front.mysuppliers.list');
    };

    $scope.add = function() {
        $state.go('front.mysuppliers.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mysuppliers.edit', {id: row.id});
    };

}]);

